<template>
  <div v-else class="flex flex-col relative">
    <table class="min-w-full table-auto">
      <tbody>
        <tr v-for="lesson of lessons.vwUsers" >
          <template v-if="lesson.status === 'Assigned'">
            <td v-for="value2,key in lesson">
              <p v-if="key === 'studentlessonid' " class="text-md font-medium text-green-900 rounded">
                <nuxt-link :to="{ path: `lessonhome?studentlessonID=` + value2 }" >
                   Start lesson
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
    <br><br>
    <button @click="ResetData" class="text-red"> Reset Data (all answer data will be deleted)</button>

  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    methods:  {
      dateTime(value) {
        if(moment(value).format('YYYY-MM-DD') !== 'Invalid date')  {
          return moment(value).format('YYYY-MM-DD');
        }
        else  {
          return value;
        }
      },
      ResetData() {
        this.$axios.post('/ResetData', {headers: {
          'content-type': 'application/json',},})
        .then((response) => {
          console.log('Ok');
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
</script>

