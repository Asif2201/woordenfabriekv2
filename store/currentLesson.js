export const state = () =>  ({
  lesson: new lessonObject
})

class lessonObject  {
  studentlessonid = '';
  studentEmail = '';
  lessontitle = '';
  lessonsubtitle = '';
  status = '';
  overallprogress = '';
  completiondate = '1-Jan-2021';
  assigneddate = '1-Jan-2021';
}

export const mutations = {
  update(state, jsonLesson) {
    state.assigneddate = jsonLesson.vwUsers[0].assigneddate;
    state.completiondate = jsonLesson.vwUsers[0].completiondate;
    state.studentlessonid = jsonLesson.vwUsers[0].studentlessonid;
    state.studentEmail = jsonLesson.vwUsers[0].studentEmail;
    state.lessonsubtitle = jsonLesson.vwUsers[0].lessonsubtitle;
    state.lessontitle = jsonLesson.vwUsers[0].lessontitle;
    state.status = jsonLesson.vwUsers[0].status;
    state.overallprogress = jsonLesson.vwUsers[0].overallprogress;ß
  }
}
