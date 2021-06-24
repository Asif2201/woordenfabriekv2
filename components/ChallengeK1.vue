<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else>
      <div class="group-744-TdZx3J">
        <div v-for="(Object, ObjIndex) in Challenge2">
            <div  class="lato-bold-sonic-silver-24px">
              <span v-for="(char, index) in Object.word" v-on:click="morphemeClick(ObjIndex, index, $event);" v-bind:id="ObjIndex + '-' + index">
                {{ char }}
              </span>
            </div>
            <div v-if="Object.answer.length<2" class="buttondisabled-TdZx3J">
              <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" v-bind:id="btnObjIndex + '-' + index">
                OK
              </button>
            </div>
            <div v-else class="buttondisabled-TdZx3J">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" v-on:click="morphemeClickOk(ObjIndex)" v-bind:id="btnObjIndex + '-' + index">
                OK
              </button>
            </div>
            <div v-if="Object.answer.length<2" class="buttondisabled-XRxZD4">
              <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" v-bind:id="btnOkObjIndex + '-' + index">
                  Wis
              </button>
            </div>
            <div v-else class="buttondisabled-XRxZD4">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" v-on:click="morphemeClickWis(ObjIndex)" v-bind:id="btnWisObjIndex + '-' + index">
                Wis
              </button>
            </div>
        </div>
        <div v-if="this.AllquestionsAnswered" class=buttondefault-4ZAul6>
            <button v-on:click="challengeCompleted()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
               Klaar
            </button>
        </div>
      </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props:  [
    'Challenge'
  ],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
      Challenge1: [],
      Challenge2: [],
      knipWords: [],
      AllquestionsAnswered: false,
    }
  },
  watch: {
    Challenge1()  {
      this.Challenge2 = this.JSONtoObj();
      console.log(this.Challenge2)
    }
  },
  async fetch() {
    const ChallengeID = this._props.Challenge;

    this.Challenge1 = await fetch(
      `http://localhost:3000/v1/ChallengeQuestions?ChallengeID=${ChallengeID}`
    ).then(res => res.json())
  },
  methods:  {
    splitWord(word)  {
      if (word) {
        return word.split('');
      } else  {
        return '';
      }
    },
    JSONtoObj()  {
      var QuestionObjectList = [];
      for (var i = 0; i < this.Challenge1.LearningQuestions.length; i++) {
          QuestionObjectList.push(this.Challenge1.LearningQuestions[i]);
          QuestionObjectList[i].word = this.splitWord(QuestionObjectList[i].word);
          QuestionObjectList[i].answer = Array('');
          QuestionObjectList[i].answerConfirmed = false;
        }
      return QuestionObjectList;
    },
    morphemeClick: function(word, char, event) {
      if(this.Challenge2[word].word[char] !== '|')  {
        this.Challenge2[word].word.splice(char, 0, '|');
        this.Challenge2[word].answer.push(char);
      }
    },
    morphemeClickOk: function(word, event) {
      this.Challenge2[word].answerConfirmed = true;
      this.AllquestionsAnswered = true;
      for (var i = 0; i < this.Challenge2.length; i++) {
        if(!this.Challenge2[i].answerConfirmed)  {
          this.AllquestionsAnswered = false;
        }
      }
    },
    morphemeClickWis: function(word, event) {
      this.Challenge2[word].answerConfirmed = false;
      this.Challenge2[word].answer.length=0;
      let index = this.Challenge2[word].word.indexOf('|');
      while(index>0)  {
        this.Challenge2[word].word.splice(index,1);
        index = this.Challenge2[word].word.indexOf('|');
      }
      this.AllquestionsAnswered = false;
    },
    challengeCompleted: function() {
      for (var i = 0; i < this.Challenge2.length; i++) {
        this.EvaluateAnswer(i);
      }
    },
    EvaluateAnswer: function(index)  {
      console.log(i);
    }
  },
}
</script>
