import { CallBase } from "../../common-modules/server/utils/callBase";
import format from 'string-format';
import moment from "moment";
import * as queryHelper from './queryHelper';
import Report from "../models/report.model";
import ReportTeacher from "../models/reportTeacher.model";
import ReportKindergarten from "../models/reportKindergarten.model";

export class YemotCall extends CallBase {
    constructor(params, callId, user) {
        super(params, callId, user);
    }
    
    send(...args) {
        console.log('yemot response', args);
        super.send(...args);
    }

    async start() {
        await this.getTexts();
        try {
            const [student, teacher] = await queryHelper.getStudentAndTeacherByUserIdAndPhone(this.user.id, this.params.ApiPhone);
            if (student) {
                await this.handleStudentCall(student);
            } else if (teacher) {
                await this.handleTeacherCall(teacher);
            }
            else {
                const kindergartenStudent = await this.getKindergartenStudent();
                if (kindergartenStudent) {
                    await this.handleKindergartenStudentCall(kindergartenStudent);
                } else {
                    await this.send(
                        this.id_list_message({ type: 'text', text: this.texts.phoneIsNotRecognizedInTheSystem }),
                        this.hangup()
                    );
                }
            }
        }
        catch (e) {
            if (e) {
                console.log('catch yemot exception', e);
            }
        } finally {
            this.end();
        }
    }

    async getKindergartenStudent() {
        await this.send(
            this.read({ type: 'text', text: this.texts.askIfIsKindergartenStudent },
                'isKindergartenStudent', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        if (this.params.isKindergartenStudent === '2') {
            return null;
        }

        await this.send(
            this.read({ type: 'text', text: this.texts.typeKindergartenTz },
                'kindergartenTz', 'tap', { max: 9, min: 1, block_asterisk: true })
        );

        const student = queryHelper.getKindergartenStudentByUserIdAndTz(this.user.id, this.params.kindergartenTz);
        return student;
    }

    async askForEnterAndExitHour(name) {
        const firstMesssage = [];
        if (this.existingReport) {
            firstMesssage.push(this.texts.existingReportWillBeDeleted);
        }

        firstMesssage.push(format(this.texts.welcomeAndTypeEnterHour, name));
        await this.send(
            this.read({ type: 'text', text: firstMesssage },
                'enterHour', 'tap', { max: 4, min: 4, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeExitHour },
                'exitHour', 'tap', { max: 4, min: 4, block_asterisk: true })
        );
    }

    async deleteExistingReport() {
        if (this.existingReport) {
            await this.existingReport.destroy();
        }
    }

    async notifySavedSuccessfully() {
        await this.send(
            this.id_list_message({ type: 'text', text: this.texts.recordWasSavedSuccessfully }),
            this.hangup()
        );
    }
    async notifyNotSaved() {
        await this.send(
            this.id_list_message({ type: 'text', text: this.texts.recordWasNotSaved }),
            this.hangup()
        );
    }

    async handleStudentCall(student) {
        this.existingReport = await queryHelper.getExistingStudentReport(student.id);
        await this.askForEnterAndExitHour(student.name);
        await this.getTeacherDetails();
        try {
            await this.deleteExistingReport();

            const baseReport = {
                user_id: this.user.id,
                student_id: student.id,
                enter_hour: this.params.enterHour,
                exit_hour: this.params.exitHour,
                report_date: new Date().toISOString().substr(0, 10),
            };

            for (const teacherReport of this.params.teacherReport) {
                await new Report({
                    ...baseReport,
                    teacher_id: teacherReport.teacher?.id,
                    teacher_full_phone: teacherReport.teacherFullPhone,
                    teacher_last_digits: teacherReport.teacherLastDigits,
                    lesson_number: teacherReport.lesson.lessonNumber,
                    other_students: teacherReport.lesson.otherStudents,
                    report_type_id: teacherReport.lesson.reportType,
                })
                    .save();
            }
            await this.notifySavedSuccessfully();
        }
        catch (e) {
            console.log('catch yemot exception', e);
            await this.notifyNotSaved();
        }
    }

    async getTeacherDetails() {
        await this.send(
            this.read({ type: 'text', text: this.texts.typeLastDigitsOfTeacher },
                'teacherLastDigits', 'tap', { max: 4, min: 4, block_asterisk: true })
        );

        const teacher = await queryHelper.getTeacherByUserIdAndLastDigits(this.user.id, this.params.teacherLastDigits);
        if (teacher) {
            await this.send(
                this.read({ type: 'text', text: format(this.texts.askForNumberOfLessons, teacher.name) },
                    'lessonNumber', 'tap', { max: 1, min: 1, block_asterisk: true })
            );
        } else {
            await this.send(
                this.read({ type: 'text', text: this.texts.teacherLastDigitIsNotInTheSystem },
                    'teacherFullPhone', 'tap', { max: 10, min: 9, block_asterisk: true })
            );
            await this.send(
                this.read({ type: 'text', text: format(this.texts.askForNumberOfLessons, '') },
                    'lessonNumber', 'tap', { max: 1, min: 1, block_asterisk: true })
            );
        }

        await this.send(
            this.read({ type: 'text', text: this.texts.askForOtherStudentsNumber },
                'otherStudents', 'tap', { max: 2, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.askForReportType },
                'reportType', 'tap', { max: 1, min: 1, block_asterisk: true })
        );

        if (!this.params.teacherReport) {
            this.params.teacherReport = [];
        }
        this.params.teacherReport.push({
            teacherLastDigits: this.params.teacherLastDigits,
            teacherFullPhone: teacher?.full_phone || this.params.teacherFullPhone,
            teacher,
            lesson: {
                lessonNumber: Number(this.params.lessonNumber),
                otherStudents: Number(this.params.otherStudents),
                reportType: Number(this.params.reportType),
            },
        });

        await this.send(
            this.read({ type: 'text', text: this.texts.askIfHasAnotherTeacher },
                'anotherTeacher', 'tap', { max: 1, min: 1, block_asterisk: true, digits_allowed: [1, 2] })
        );
        if (this.params.anotherTeacher === '1') {
            await this.getTeacherDetails();
        }
    }

    async handleTeacherCall(teacher) {
        let welcome = format(this.texts.welcomeForTeacher, teacher.name);

        if (this.texts.extraQuestion) {
            await this.send(
                welcome && this.id_list_message({ type: 'text', text: welcome }),
                this.read({ type: 'text', text: this.texts.extraQuestion },
                    'extraQuestion', 'tap', { max: 1, min: 1, block_asterisk: true })
            );

            welcome = null;
        }

        await this.send(
            welcome && this.id_list_message({ type: 'text', text: welcome }),
            this.read({ type: 'text', text: this.texts.chooseReportDateType },
                'reportDateType', 'tap', { max: 1, min: 1, block_asterisk: true })
        );

        if (this.params.reportDateType === '1') {
            this.report_date = moment().format('YYYY-MM-DD');
        } else if (this.params.reportDateType === '2') {
            await this.send(
                this.read({ type: 'text', text: this.texts.chooseReportDate },
                    'reportDate', 'tap', { max: 8, min: 8, block_asterisk: true })
            );
            this.report_date = moment(this.params.reportDate, 'DDMMYYYY').format('YYYY-MM-DD');
        } else {
            await this.send(
                this.hangup()
            );
        }

        const messages = [];
        this.existingReport = await queryHelper.getExistingTeacherReport(teacher.id, this.report_date);
        if (this.existingReport) {
            if (moment(this.report_date, 'YYYY-MM-DD').isBefore(moment().startOf('month'))) {
                await this.send(
                    this.id_list_message({ type: 'text', text: this.texts.cannotChangeReportOfPreviousMonth }),
                    this.hangup()
                );
            } else {
                messages.push(this.texts.existingReportWillBeDeleted);
            }
        }

        // await this.askForEnterAndExitHour(teacher.name);
        await this.send(
            messages.length && this.id_list_message({ type: 'text', text: messages }),
            this.read({ type: 'text', text: this.texts.typeNumberOfLessons },
                'howManyLessons', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeWatchingStudents },
                'watchingStudents', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeTeachingStudents },
                'teachingStudents', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeWasTelephone },
                'wasTelephone', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeTrainingTeacherKey },
                'trainingTeacher', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        await this.send(
            this.read({ type: 'text', text: this.texts.typeSpeciallityKey },
                'speciallity', 'tap', { max: 1, min: 1, block_asterisk: true })
        );
        try {
            await this.deleteExistingReport();

            await new ReportTeacher({
                user_id: this.user.id,
                teacher_id: teacher.id,
                enter_hour: this.params.enterHour,
                exit_hour: this.params.exitHour,
                report_date: this.report_date,
                update_date: new Date(),
                lessons_number: this.params.howManyLessons,
                watching_students: this.params.watchingStudents,
                teaching_students: this.params.teachingStudents,
                was_telephone: this.params.wasTelephone == '1',
                training_teacher: this.params.trainingTeacher,
                speciallity: this.params.speciallity,
                extra_question: this.params.extraQuestion,
            }).save();

            await this.notifySavedSuccessfully();
        }
        catch (e) {
            console.log('catch yemot exception', e);
            await this.notifyNotSaved();
        }
    }

    async handleKindergartenStudentCall(student) {
        this.existingReport = await queryHelper.getExistingKindergartenStudentReport(student.id);
        await this.askForEnterAndExitHour(student.name);
        await this.send(
            this.read({ type: 'text', text: this.texts.typeWatchedLessons },
                'watchedLessons', 'tap', { max: 2, min: 1, block_asterisk: true })
        );
        try {
            await this.deleteExistingReport();

            await new ReportKindergarten({
                user_id: this.user.id,
                student_id: student.id,
                api_phone: this.params.ApiPhone,
                enter_hour: this.params.enterHour,
                exit_hour: this.params.exitHour,
                report_date: new Date().toISOString().substr(0, 10),
                watched_lessons: this.params.watchedLessons,
            }).save();

            await this.notifySavedSuccessfully();
        }
        catch (e) {
            console.log('catch yemot exception', e);
            await this.notifyNotSaved();
        }
    }
}
