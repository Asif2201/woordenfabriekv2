<template>
  <div :class="[`group-453`, className || ``]">
    <div class="group-580"><div class="percent lato-normal-white-13px">78%</div></div>
  </div>
</template>

<script>
export default {
  name: "Group453",
  props: ["className"],
};
</script>

<style>
.group-453 {
  align-items: flex-start;
  background-color: var(--mercury);
  border-radius: 4px;
  display: flex;
  min-width: 605px;
}

.group-580 {
  align-items: flex-start;
  background-color: var(--grey);
  border-radius: 4px;
  display: flex;
  height: 25px;
  justify-content: flex-end;
  min-width: 504px;
  padding: 3.5px 1px;
}

.percent {
  height: 17px;
  letter-spacing: 0;
  line-height: 16px;
  white-space: nowrap;
}

.group-453.group-453-1 {
  margin-left: 164.15px;
  margin-top: 28px;
}
</style>
