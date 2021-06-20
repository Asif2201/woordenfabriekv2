<template>
  <div class="align-top" v-if="$fetchState.pending">Fetching lessons...</div>
  <div class="align-top" v-else-if="$fetchState.error">An error occurred :(</div>
  <div v-else class="flex flex-col relative">
    <table class="min-w-full table-auto">
      <thead class="justify-between">
        <tr class="bg-gray-800">
          <th class="px-16 py-2">id</th>
          <th class="px-16 py-2">title</th>
          <th class="px-16 py-2">status</th>
          <th class="px-16 py-2">date assigned</th>
          <th class="px-16 py-2">date completed</th>
        </tr>
      </thead>
      <tbody class="bg-gray-200">
        <tr v-for="lesson of lessons.vwUsers" >
          <td v-for="value2,key in lesson">
            <p v-if="key === 'studentlessonid' " class="text-sm font-medium text-gray-900">
              <nuxt-link :to="{ path: '/lesson/' + value2 }" >
                {{ value2 }}
              </nuxt-link>
            </p>
            <p v-else-if="key !== 'studentemail' " class="text-sm font-medium text-gray-900">
              {{   dateTime(value2)  }}
            </p>
          </td>
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
        'http://localhost:3000/v1/userLessons?studentEmail=jaap@appalot.com'
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

