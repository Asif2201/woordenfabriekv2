<template>
  <div>
      <span :class="IsStarOn(0)" style="margin-left:16px">
        &#9733;
      </span>
      <span :class="IsStarOn(1)">
        &#9733;
      </span>
      <span :class="IsStarOn(2)">
        &#9733;
      </span>
      <span :class="IsStarOn(3)">
        &#9733;
      </span>
      <span :class="IsStarOn(4)">
        &#9733;
      </span>
    </div>
</template>

<script>
export default {
  name: "StarRating",
  props: ['value'],
  methods:  {
    IsStarOn(index) {
      if(this.$props['value'] > index) {
        return 'onStar';
      }
      else  {
        return 'OffStar';
      }
    }
  }
};
</script>
<style scoped>
  .onStar {
    font-family: lato;
    font-size: 12px;
    color:darkorange;
  }
  .OffStar  {
    font-family: lato;
    font-size: 12px;
    color:lightgray;
  }
</style>
