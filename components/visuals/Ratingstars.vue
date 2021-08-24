<template>
  <div :class="[`ratingstars`, className || ``]">
    <img
      class="star-3"
      src="https://anima-uploads.s3.amazonaws.com/projects/611a7f0c61730e50eecb813f/releases/611a7f7161730e50eecb8145/img/star-10@1x.png"
    />
    <img
      class="star-4"
      src="https://anima-uploads.s3.amazonaws.com/projects/611a7f0c61730e50eecb813f/releases/611a7f7161730e50eecb8145/img/star-10@1x.png"
    />
    <img class="star-5" :src="star3" /><img class="star-4" :src="star4" />
  </div>
</template>

<script>
export default {
  name: "Ratingstars",
  props: ["star3", "star4", "className"],
};
</script>

<style>
.ratingstars {
  align-items: flex-start;
  display: flex;
  height: 13px;
  justify-content: flex-end;
  left: 465px;
  padding: 0 0px;
  position: absolute;
  top: 89px;
}

.star-3 {
  height: 13px;
  margin-top: 0;
  object-fit: cover;
  width: 13px;
}

.star-4 {
  height: 13px;
  margin-left: 3px;
  margin-top: 0;
  object-fit: cover;
  width: 13px;
}

.star-5 {
  height: 13px;
  margin-left: 4px;
  margin-top: 0;
  object-fit: cover;
  width: 13px;
}

.ratingstars.ratingstars-1 {
  left: 605px;
}

.ratingstars.ratingstars-2 {
  left: 741px;
}
</style>
