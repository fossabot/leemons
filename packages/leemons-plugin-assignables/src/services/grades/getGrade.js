const { grades } = require('../tables');

module.exports = async function getGrade(
  { assignation, subject, type, visibleToStudent },
  { transacting } = {}
) {
  // TODO: Check permissions
  const query = {
    assignation,
  };

  if (subject) {
    query.subject = subject;
  }

  if (type) {
    query.type = type;
  }

  if (visibleToStudent) {
    query.visibleToStudent = visibleToStudent;
  }

  return grades.find(query, { transacting });
};
