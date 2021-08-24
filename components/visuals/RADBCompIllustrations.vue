<template>
  <div class="container-center-horizontal">
    <div class="radb-comp-illustrations screen">
      <div class="flex-col">
        <img class="group-825" :src="group825" /><img class="group-906" :src="group906" /><img
          class="group-902"
          :src="group902"
        /><img class="group-903" :src="group903" /><img class="group-904" :src="group904" /><img
          class="group-905"
          :src="group905"
        /><img class="group-901" :src="group901" />
      </div>
      <div class="flex-col-1">
        <img class="group-907" :src="group907" /><img class="component-93-3" :src="component933" /><img
          class="group-908"
          :src="group908"
        /><img class="group-913" :src="group913" /><img class="group-910" :src="group910" /><img
          class="group-912"
          :src="group912"
        /><img class="group-911" :src="group911" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RADBCompIllustrations",
  props: [
    "group825",
    "group906",
    "group902",
    "group903",
    "group904",
    "group905",
    "group901",
    "group907",
    "component933",
    "group908",
    "group913",
    "group910",
    "group912",
    "group911",
  ],
};
</script>

<style>
.radb-comp-illustrations {
  align-items: flex-start;
  background-color: var(--white);
  display: flex;
  height: 3654px;
  padding: 0 76.4px;
  width: 1980px;
}

.flex-col {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-top: 97.04px;
  min-height: 3240px;
  width: 1058px;
}

.group-825 {
  height: 59px;
  object-fit: cover;
  width: 1058px;
}

.group-906 {
  height: 349px;
  margin-left: 38.63px;
  margin-top: 147px;
  object-fit: cover;
  width: 557px;
}

.group-902 {
  height: 361px;
  margin-left: 38.63px;
  margin-top: 222px;
  object-fit: cover;
  width: 362px;
}

.group-903 {
  height: 270px;
  margin-left: 38.63px;
  margin-top: 222px;
  object-fit: cover;
  width: 476px;
}

.group-904 {
  height: 335px;
  margin-left: 38.63px;
  margin-top: 222px;
  object-fit: cover;
  width: 429px;
}

.group-905 {
  height: 226px;
  margin-left: 38.63px;
  margin-top: 147px;
  object-fit: cover;
  width: 337px;
}

.group-901 {
  height: 408px;
  margin-left: 38.63px;
  margin-top: 272px;
  object-fit: cover;
  width: 566px;
}

.flex-col-1 {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 46px;
  margin-top: 421px;
  min-height: 1827px;
  width: 478px;
}

.group-907 {
  height: 141px;
  margin-right: 19px;
  object-fit: cover;
  width: 314px;
}

.component-93-3 {
  height: 148px;
  margin-right: 31.13px;
  margin-top: 142px;
  object-fit: cover;
  width: 148px;
}

.group-908 {
  height: 125px;
  margin-right: 0;
  margin-top: 201px;
  object-fit: cover;
  width: 333px;
}

.group-913 {
  height: 140px;
  margin-right: 50px;
  margin-top: 71px;
  object-fit: cover;
  width: 175px;
}

.group-910 {
  height: 148px;
  margin-top: 187px;
  object-fit: cover;
  width: 478px;
}

.group-912 {
  height: 64px;
  margin-right: 64.3px;
  margin-top: 188px;
  object-fit: cover;
  width: 268px;
}

.group-911 {
  height: 71px;
  margin-right: 65px;
  margin-top: 199px;
  object-fit: cover;
  width: 330px;
}
</style>
