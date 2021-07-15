<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">{{ $fetchState.error }}</div>
  <div v-else class="flex flex-col relative">
    <table class="min-w-full table-auto">

      <tbody class="bg-gray-200">

        <tr v-for="lesson of lessons.vwUsers" >
          <template v-if="lesson.status === 'Assigned'">
            <td v-for="value2,key in lesson">
              <p v-if="key === 'studentlessonid' " class="text-sm font-medium text-gray-900">
                <nuxt-link :to="{ path: `/lessonhome?studentlessonID=` + value2 }" >
                  Click to start lesson
                </nuxt-link>
              </p>
            </td>
          </template>
          <template v-else>
            <td v-for="value2,key in lesson">
            <p v-if="key === 'studentlessonid' " class="text-sm font-medium text-gray-300">
                {{ value2 }}
            </p>
          </td>
          </template>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    data() {
      return {
        lessons: []
      }
    },
    async fetch() {
      this.lessons = await fetch(
        `${this.$config.baseURL}/userLessons?studentEmail=jaap@appalot.com`
      ).then(res => res.json())
    },
    methods:  {
      dateTime(value) {
        if(moment(value).format('YYYY-MM-DD') !== 'Invalid date')  {
          return moment(value).format('YYYY-MM-DD');
        }
        else  {
          return value;
        }
      }
    }
  }
</script>

