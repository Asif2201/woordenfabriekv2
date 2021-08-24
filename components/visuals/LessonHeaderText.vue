<template>
    <div>
      <h1 class="lesson-title">{{ lessonTitle }}</h1>
      <div class="text-3">
        <span class="lato-bold-cerise-36px">{{ spanText }}</span
        ><span class="lato-bold-sonic-silver-36px">{{ spanText2 }}</span
        ><span class=" ">{{ spanText3 }}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: "LessonHeaderText",
  props: ["lessonTitle", "spanText", "spanText2", "spanText3"],
};
</script>

<style>
.radb-comp-headers-text {
  align-items: flex-start;
  background-color: var(--white);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 1347px;
  padding: 109px 113px;
  width: 1980px;
}

.lesson-title {
  color: var(--grey);
  font-family: var(--font-family-lato);
  font-size: 72px;
  letter-spacing: 0;
  line-height: 30px;
  margin-left: 6px;
  min-height: 88px;
  white-space: nowrap;
}

.text-3 {
  color: var(--blue);
  font-family: var(--font-family-lato);
  font-size: var(--font-size-xxxl);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 30px;
  margin-top: 36px;
  min-height: 46px;
  white-space: nowrap;
}
</style>
