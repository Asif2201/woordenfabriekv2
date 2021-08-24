<template>
  <div :class="[`buttonsecondary`, className || ``]">
    <div class="overlap-group1-3">
      <div class="rectangle-27"></div>
      <div class="log-in h5">log in</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Buttonsecondary",
  props: ["className"],
};
</script>

<style>
.buttonsecondary {
  align-items: flex-start;
  display: flex;
  height: 36px;
  left: 1776px;
  position: absolute;
  top: 16px;
}

.overlap-group1-3 {
  height: 36px;
  position: relative;
  width: 107px;
}

.rectangle-27 {
  background-color: var(--bon-jour);
  border-radius: 4px;
  height: 36px;
  left: 0;
  position: absolute;
  top: 0;
  width: 105px;
}

.log-in {
  color: var(--black-3);
  font-weight: 700;
  height: 21px;
  left: 0;
  line-height: 14px;
  position: absolute;
  text-align: center;
  top: 9px;
  width: 107px;
}

.buttonsecondary.buttonsecondary-1 {
  height: unset;
  left: unset;
  margin-left: 164px;
  margin-top: 32px;
  min-width: 107px;
  position: unset;
  top: unset;
}
</style>
