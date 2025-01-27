const { addSubject } = require('./addSubject');
const { listSubjects } = require('./listSubjects');
const { updateSubject } = require('./updateSubject');
const { setSubjectCredits } = require('./setSubjectCredits');
const { getSubjectCredits, getSubjectsCredits } = require('./getSubjectCredits');
const { subjectNeedCourseForAdd } = require('./subjectNeedCourseForAdd');
const { listSubjectCreditsForProgram } = require('./listSubjectCreditsForProgram');
const { subjectByIds } = require('./subjectByIds');

module.exports = {
  addSubject,
  listSubjects,
  updateSubject,
  setSubjectCredits,
  getSubjectCredits,
  getSubjectsCredits,
  subjectNeedCourseForAdd,
  listSubjectCreditsForProgram,
  subjectByIds,
};
