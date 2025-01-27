module.exports = {
  tableInput: {
    add: 'Add',
    remove: 'Remove',
    edit: 'Edit',
    accept: 'Accept',
    cancel: 'Cancel',
  },
  methodology: {
    directInstruction: 'Direct Instruction',
    flippedClassroom: 'Flipped Classroom',
    projectBasedLearning: 'Project-Based Learning',
    inquiryBasedLearning: 'Inquiry-Based Learning',
    expeditionaryLearning: 'Expeditionary Learning',
    cooperativeLearning: 'Cooperative Learning',
    personalizedLearning: 'Personalized Learning',
    gameBasedLearning: 'Game-Based Learning',
    kinestheticLearning: 'Kinesthetic Learning',
    differentiatedInstruction: 'Differentiated Instruction',
    other: 'Other',
  },
  welcome_page: {
    page_title: 'Tasks',
    page_description:
      'Thanks to the tasks module you can create new tasks, assign them to groups of students or individuals, monitor their current status and start evaluations of completed tasks.',
    hide_info_label:
      "Ok, I've got it. When the configuration is complete, don't show this info anymore",
    step_profiles: {
      title: 'Link profiles',
      description: 'Identify which profiles match the teachers and students',
      btn: 'Link profiles',
    },
    step_library: {
      title: 'Tasks Library',
      description:
        'Create new tasks and assign them or review the created tasks in the task library.',
      btn: 'Create task',
    },
    step_ongoing: {
      title: 'Ongoing tasks',
      description:
        'Reviews tasks in progress and monitors their status. It is also possible to start the correction of completed tasks.',
      btn: 'View ongoing tasks',
    },
    step_history: {
      title: 'History',
      description: "View completed tasks, their evaluations, and the student's feedback.",
      btn: 'View tasks history',
    },
  },
  library_page: {
    page_title: 'Task Library',
    published: 'Published',
    draft: 'Draft',
  },
  task_setup_page: {
    title: 'Create new task',
    edit_title: 'Edit task',
    common: {
      select_center: 'Select center',
      create_done: 'Task created',
      update_done: 'Task updated',
      publish_done: 'Task published',
      no_id_error: 'No task ID provided',
      save: 'Save draft',
      publish: 'Publish',
    },
    setup: {
      basicData: {
        step_label: 'Basic',
        labels: {
          name: 'Name',
          tagline: 'Tagline',
          description: 'Summary',
          buttonNext: 'Next',
        },
        placeholders: {
          name: "Task name",
          tagline: 'Subtitle of the task',
          description: 'What is this assignment about?',
        },
        errorMessages: {
          name: {
            required: 'Required field',
          },
          tagline: {
            required: 'Required field',
          },
        },
      },
      configData: {
        step_label: 'Configure',
        labels: {
          configTitle: 'Configure',
          center: 'Center',
          program: 'Program',
          course: 'Course',
          subjectsTitle: 'Subjects',
          subject: 'Subject',
          addSubject: 'Add subject',
          level: 'Level',
          levelValues: {
            begginer: 'Beginner',
            intermediate: 'Intermediate',
          },
          buttonNext: 'Next',
          buttonPrev: 'Previous',
          preTask: {
            toggler: 'Add a pre-task activity',
            mandatory: 'Mandatory to start the Task',
            condition: 'Condition to start the Task',
            conditions: {
              take: 'Only take the test',
              greater: 'Pass the test with a score higher than',
            },
          },
          title: 'Configuration',
          subjects: 'Subjects',
          showOtherSubjects: 'Add subjects I collaborate in',
        },
        placeholders: {
          center: 'Select...',
          program: 'Select...',
          course: 'Select...',
          subject: 'Select...',
          level: 'Select...',
          addSubject: 'Add subject',
        },
        errorMessages: {
          program: {
            required: 'Required field',
          },
          course: {
            required: 'Required field',
          },
          subjects: {
            required: 'Required field',
          },
          level: {
            required: 'Required field',
          },
          summary: {
            required: 'Required field',
          },
          subject: {
            required: 'Required field',
          },
        },
      },
      contentData: {
        step_label: 'Content',
        labels: {
          title: 'Content',
          subjects: 'Subjects',
          methodology: 'Methodology',
          statement: 'Statement',
          development: 'Development',
          statementAndDevelopmentTitle: 'Statement and development',
          objectives: 'Custom objectives',
          curriculum: 'Curriculum',
          content: 'Content',
          assessmentCriteria: 'Assessment criteria',
          addFromCurriculum: 'Add from curriculum',
          buttonNext: 'Next',
          buttonPrev: 'Previous',
          submission: {
            title: 'Evaluation',
            gradable: 'Gradable',
            checkDescription: 'This task requires the submission of a file, document or link.',
            type: 'Type of submission',
            types: {
              file: 'File',
              link: 'Link',
            },
            description: 'Description',
            FileType: {
              multiFile: 'Allow multiple files',
              type: 'Type',
              typePlaceholder: 'Add extension',
              maxSize: 'Max size',
              required: 'Required field',
            },
          },
          attachmentsTitle: 'Resources',
          supportImage: 'Support image',
          searchFromLibrary: 'Search in library',
          searchFromLibraryDocsAndMedia: 'Add documents and media',
        },
        errorMessages: {
          statement: {
            required: 'Required field',
          },
        },
      },
      instructionData: {
        step_label: 'Instructions',
        labels: {
          title: 'Instructions',
          forTeacher: 'Instructions for Teacher',
          forStudent: 'Instructions for Student',
          recommendedDuration: 'Recommended duration',
          buttonPublish: 'Only publish',
          buttonNext: 'Publish and assign',
          buttonPrev: 'Previous',
        },
        placeholders: {
          forTeacher: 'Help other teachers approach this exercise with a few simple instructions.',
          forStudent:
            'Here it is possible to include extra information to help the student perform the exercise better.',
        },
      },
      publishData: {
        step_label: 'Publish',
        labels: {
          title: 'Publish & Assign',
          description:
            'You can now save this activity in your library to use it whenever you want or, in the same step, assign it for your students to do.',
          assign: 'Assign later to students',
          buttonNext: 'Publish',
          buttonPrev: 'Previous',
        },
      },
    },
  },
  assignment_page: {
    page_title: 'Assign tasks',
  },
  assignment_form: {
    labels: {
      classroomToAssign: 'Assign to classroom',
      studentToAssign: 'Assign to Student',
      mode: 'Mode',
      startDate: 'Start date',
      deadline: 'Deadline',
      visualizationDateToogle: 'Make visible in advance',
      visualizationDate: 'Visualization date',
      limitedExecutionToogle: 'Limit execution time',
      limitedExecution: 'Limited execution time',
      alwaysOpenToogle: 'This task is always available and can be performed at any time.',
      closeDateToogle: 'Deadline for teacher corrections',
      closeDate: 'Close date',
      messageToStudentsToogle: 'Add a message to the students',
      messageToStudents: 'Message to the students',
      showCurriculumToogle: 'Show curriculum',
      content: 'Content',
      objectives: 'Objectives',
      assessmentCriteria: 'Assessment criteria',
      submit: 'Assign',
      add: 'Add',
      assignTo: {
        class: 'Class',
        customGroups: 'Custom Groups',
        session: 'Session',
      },
      selectStudentsTitle: 'Who will perform the task?',
      excludeStudents: 'Exclude students',
      subjects: {
        title: 'Subjects to be evaluated in this task',
        subtitle: 'NOTE: At least one of them',
      },
      unableToAssignStudentsMessage:
        'The students which are not enrolled in all the selected subjects will not be assigned',
      matchingStudents: 'matching students',
      groupName: "Group name",
      students: 'Students',
      noStudentsToAssign:
        'There are no students enrrolled in the selected subjects, please select other combination',
    },
    placeholders: {
      date: 'dd/mm/yyyy',
      time: 'hh:mm',
      units: 'units',
    },
    descriptions: {
      messageToStudents:
        'If this task is assigned to other groups in this step, this message will be the default message for all tasks (although it can be changed individually if desired).',
      visualizationDate:
        'NOTE: The task will be available for review, but cannot be completed until the start date.',
      closeDateToogle: 'NOTE: After this date, no corrections can be made',
      limitedExecution:
        'NOTE: This is the time interval after reviewing the task summary until the submission of the deliverable.',
    },
    assignTo: {
      student: 'Student',
      class: 'Class',
    },
    modes: {
      individual: 'Individual',
      pairs: 'In pairs',
      groups: 'Teams',
    },
    timeUnits: {
      hours: 'hours',
      minutes: 'minutes',
      days: 'days',
    },
  },
  profiles_page: {
    page_title: 'Tasks - Profile setup',
    page_description:
      'First of all it is necessary to match the system profiles with the custom profiles that have been created on the platform (Please carefully read the characteristics of each profile. Once the profiles are linked, it cannot be undone.)',
    save: 'Save',
    loadFromAP: 'Load profiles from Academic Portfolio',
    profileSaved: 'Saved profiles',
    profiles: 'Profiles',
    teacher: 'Teacher',
    teacherDescription: 'Responsible for the creation and assignment of tasks',
    teacherRequired: 'Field required',
    student: 'Student',
    studentDescription: 'Will be assigned the tasks and will be responsible for executing them',
    studentRequired: 'Field required',
  },
  ongoing_page: {
    page_title: 'Ongoing tasks',
  },
  history_page: {
    page_title: 'History',
  },
  teacher_assignments: {
    table: {
      headers: {
        group: 'Group',
        task: 'Task',
        deadline: 'Deadline',
        students: 'Students',
        status: 'Status',
        open: 'Open',
        ongoing: 'Ongoing',
        completed: 'Completed',
        actions: 'Actions',
      },
    },
  },
  tabStudentTasks: {
    label: 'Task & Activities',
  },
  cardMenu: {
    edit: 'Edit',
    assign: 'Assign',
    delete: 'Delete',
    duplicate: 'Duplicate',
  },
  task_realization: {
    confirmation_modal: {
      labels: {
        confirm: 'Confirm the submission',
        cancel: 'Cancel',
      },
      title: 'Finish and submit this task',
      description:
        '<p>Once "Confirm submission" is clicked, the task will be sent to a reviewer and it will not be possible to modify the selected deliverables. If you only want to save the work done so far, you can cancel this action and press on "Save only".</p><p>When you confirm the submission, the system will redirect you to the "Ongoing activities" section where you can review the tasks once they are corrected.</p>',
    },
    activityContainer: {
      deadline: {
        label: 'Submission',
      },
    },
    buttons: {
      previous: 'Previous',
      next: 'Next',
      finish: 'Finish',
      save: 'Save',
    },
    sidebar: {
      resources: 'Resources',
      team: 'Your team',
    },
    steps: {
      statement: 'Statement',
      development: 'Development',
      submission: 'Submission',
    },
    statement_step: {
      statement: 'Statement',
      curriculum: {
        title: 'Curriculum',
        content: 'Content',
        objectives: 'Custom objectives',
        assessmentCriteria: 'Assessment criteria',
      },
    },
    development_step: {
      development: 'Development',
    },
    submission_step: {
      submission_type: {
        file: {
          uploadTitle: 'Click to upload a file',
          uploadSubtitle: 'Or drag it here',
          errorMessage: {
            title: 'Error',
            message: 'The file could not be uploaded',
          },
          errorAlert: 'The file {{fileName}} was rejected: {{error}}',
          upload: 'Upload',
        },
        link: {
          link: 'Submission link',
          invalidURL: 'The URL is invalid',
        },
      },
      submission_state: {
        error: {
          title: 'Error',
          message: 'The changes could not be saved: {{error}}',
        },
        loading: {
          title: 'Saving',
          message: 'Saving changes...',
        },
        submitted: {
          title: 'Submitted',
          message: 'That task has been submitted',
        },
        notSubmitted: {
          title: 'Not submitted',
          message: 'That task has not been submitted yet',
        },
      },
      submission: 'Submission',
    },
    limitedTimeAlert: {
      beforeStart: 'Before beginning',
      noTimeLimit: 'Without time limit',
      withoutPause: 'Non-stop',
      howItWorks: 'How it works?',
      limitedTimeTitle: 'Time limit',
      limitedTime:
        'Once you start, you have {{time}} to finish this task, you must submit it before this time ends.',
      pauseTitle: "The task can't be paused",
      pause:
        'If you leave the app with the task in process, this task will be finished and the last submission will be sent automatically before the interruption. If the system detects an error and you are expelled from the task, you can notify it and if your error is verified you can repeat it.',
      closedTaskFirstLine: 'This activity is in "only read" mode.',
      closedTaskSecondLine: 'The start date for this activity is: {{time}}',
    },
  },
  task_correction: {
    punctuation: 'Punctuation',
    minToPromote: 'Min. to promote',
    feedbackForStudent: 'Feedback for student',
    optional: 'Optional',
    submission: {
      title: 'Submission',
      types: {
        notFound: {
          notFound: 'The submission type could not be found',
        },
        file: {
          noSubmission: 'No submission was made yet',
        },
      },
    },
    types: {
      calificable: 'Qualifiable',
      evaluable: 'Evaluate with punctuation',
      noPunctuationEvaluable: 'Evaluate without punctuation',
    },
    contactTeacher: {
      title: 'Do you want to contact the teacher?',
      button: 'Write to your teacher',
    },
    save: 'Save feedback',
    saveAndSend: 'Save and send feedback',
    saveMessage: 'The changes have been saved',
    saveAndSendMessage: 'The changes have been saved and have been sent to the student',
    saveError: 'The changes could not be saved: {{error}}',
    subjectNotCorrectedYet: ' This subject has not been corrected yet',
  },
};
