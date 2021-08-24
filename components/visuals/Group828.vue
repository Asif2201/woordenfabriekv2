<template>
  <div :class="[`group-828`, className || ``]">
    <div class="level lato-normal-white-13px">{{ children }}</div>
  </div>
</template>

<script>
export default {
  name: "Group828",
  props: ["children", "className"],
};
</script>

<style>
.group-828 {
  align-items: flex-start;
  background-color: var(--mercury);
  border-radius: 4px;
  display: flex;
  height: 25px;
  justify-content: flex-end;
  left: 435px;
  padding: 2.5px 17px;
  position: absolute;
  top: 110px;
}

.level {
  height: 19px;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
  width: 96px;
}

.group-828.group-829 {
  left: 571px;
}

.group-828.group-834 {
  left: 707px;
}

.group-828.group-831 {
  background-color: var(--pink);
  left: 843px;
}

.group-828.group-899 {
  left: unset;
  min-width: 132px;
  position: unset;
  top: unset;
}

.group-828.group-898 {
  background-color: var(--pink);
  left: unset;
  margin-left: 27px;
  min-width: 132px;
  position: unset;
  top: unset;
}
</style>
