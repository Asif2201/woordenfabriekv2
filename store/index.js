export const state = () => ({
  userEmail: '',
  Lessons: [],
  currentProgressLesson: -1,
  validEmails: ['jaap@appalot.com', 'veronique.verhagen@fontys.nl', 'e.m.b.mulder@rug.nl', 'j.vandergraaf@pwo.ru.nl']
})
export const getters =  {
  isValidEmail: (state) => (loginEmail) => {
    return state.validEmails.includes(loginEmail);
  }
}
export const mutations = {
  setUserEmail(state, userEmail) {
    if(userEmail) {
      state.userEmail = userEmail;
    }
  },
  initialiseLessons(state, newLessons) {
    state.Lessons = [];
    for(var i = 0; i < newLessons.vwUsers.length;i++) {
      state.Lessons.push(newLessons.vwUsers[i]);
      if(newLessons.vwUsers[i].status !== 'Completed' && state.currentProgressLesson > 0)  {
        state.currentProgressLesson = i;
      }
      state.Lessons.currentDisplayLesson  = 0;
      state.Lessons[i].Levels = [];
    }
  },
  storeLevels(state, payload)  {
    var lessonIndex = -1;
    var i;
    const studentlessonID = payload.slid;
    for(i = 0; i < state.Lessons.length;i++)  {
      if(state.Lessons[i].studentlessonID === studentlessonID)  {
        lessonIndex = i;
        break;
      }
    }
    state.Lessons[lessonIndex].Levels = payload.levels;

    for(i = 0; i < state.Lessons[lessonIndex].Levels.length;i++)  {
      state.Lessons[lessonIndex].Levels[i].Challenges = [];
      state.Lessons[lessonIndex].Levels[i].currentProgressChallenge =0;
      state.Lessons[lessonIndex].Levels[i].currentDisplayChallenge =0;
      if(state.Lessons[lessonIndex].Levels[i].iscurrent === 'Yes')  {
        state.Lessons[lessonIndex].currentProgressLevel= i;
        state.Lessons[lessonIndex].currentDisplayLevel = i;
      }
    }
  },
  storeChallenges(state, payload) {
    var lessonIndex = -1;
    var levelIndex = -1;
    var i;

    const studentChallenges = payload.challenges;
    const  lstudentlessonID = payload.slid;
    const lstudentLevelID = payload.lvlid;


    for(i = 0; i < state.Lessons.length;i++)  {
      if(state.Lessons[i].studentlessonid === lstudentlessonID)  {
        lessonIndex = i;
        break;
      }
    }
    for(i = 0; i < state.Lessons[lessonIndex].Levels.length;i++)  {
      if(state.Lessons[lessonIndex].Levels[i].studentlevelid === lstudentLevelID)  {
        levelIndex = i;
        break;
      }
    }

    state.Lessons[lessonIndex].Levels[levelIndex].Challenges = studentChallenges;

    for(i = 0; i < studentChallenges.length;i++)  {
      if(state.Lessons[lessonIndex].Levels[levelIndex].Challenges[i].IsCurrent === 'Yes')  {
        state.Lessons[lessonIndex].Levels[levelIndex].currentProgressChallenge = i;
        state.Lessons[lessonIndex].Levels[levelIndex].currentDisplayChallenge = i;
        break;
      }
    }

  },
  UpdateCurrentChallengePointer(state, payload) {
    var lessonIndex = -1;
    var levelIndex = -1;
    var i;

    const dir = payload.dir;
    const  lstudentlessonID = payload.slid;
    const lstudentLevelID = payload.lvlid;
    for(i = 0; i < state.Lessons.length;i++)  {
      if(state.Lessons[i].studentlessonid === lstudentlessonID)  {
        lessonIndex = i;
        break;
      }
    }
    for(i = 0; i < state.Lessons[lessonIndex].Levels.length;i++)  {
      if(state.Lessons[lessonIndex].Levels[i].studentlevelid === lstudentLevelID)  {
        levelIndex = i;
        break;
      }
    }
    if(dir === 'next')  {
      if(state.Lessons[lessonIndex].Levels[levelIndex].currentDisplayChallenge < state.Lessons[lessonIndex].Levels[levelIndex].Challenges.length-1) {
        state.Lessons[lessonIndex].Levels[levelIndex].currentDisplayChallenge++;
      }
    }
    else{
      if(state.Lessons[lessonIndex].Levels[levelIndex].currentDisplayChallenge > 0) {
        state.Lessons[lessonIndex].Levels[levelIndex].currentDisplayChallenge--;
      }
    }
  },

  UpdateCurrentLevelPointer(state, payload) {
    var lessonIndex = -1;
    var levelIndex = -1;
    var i;

    const gotoLevel = payload.LevelID;
    const  lstudentlessonID = payload.slid;
    for(i = 0; i < state.Lessons.length;i++)  {
      if(state.Lessons[i].studentlessonid === lstudentlessonID)  {
        lessonIndex = i;
        break;
      }
    }
    for(i = 0; i < state.Lessons[lessonIndex].Levels.length;i++)  {
      if(state.Lessons[lessonIndex].Levels[i].Levelid === gotoLevel)  {
        levelIndex = i;
        break;
      }
    }
    state.Lessons[lessonIndex].currentDisplayLevel = levelIndex;
    state.Lessons[lessonIndex].Levels[levelIndex].currentDisplayChallenge = 0;
  }
}
