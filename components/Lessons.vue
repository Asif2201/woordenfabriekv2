<template>
  <p v-if="$fetchState.pending">Fetching lessons...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <div v-else>
    <h1>Your lessons</h1>
    <ul>
      <li v-for="lesson of lessons.vwUsers">{{ lesson.lessontitle }}</li>
    </ul>
    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
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
    }
  }
</script>

