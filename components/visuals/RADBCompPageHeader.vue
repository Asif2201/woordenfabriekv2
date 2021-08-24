<template>
  <div class="container-center-horizontal">
    <div class="radb-comp-pageheader screen" onclick="window.open('radb-comp-learningobject.html', '_self');">
      <div class="group-900">
        <div class="overlap-group2-1">
          <img class="path-747" :src="path747" />
          <p class="text-9 lato-normal-black-14px">
            <span class="span0-4 h5">{{ spanText }}</span
            ><span class="span1-2 table-body">{{ spanText2 }}</span>
          </p>
          <div class="group-597">
            <img class="bars" :src="bars" />
            <div class="menu h5">{{ menu }}</div>
          </div>
          <img class="rectangle-578" :src="rectangle578" /><buttonsecondary />
          <div class="rectangle-589"></div>
          <div class="les-1-voortgang lato-bold-cerise-36px-2">
            <span class="lato-bold-sonic-silver-36px">{{ spanText3 }}</span
            ><span class="lato-bold-cerise-36px">{{ spanText4 }}</span>
          </div>
          <group828 :children="group828Props.children" />
          <group828 :children="group8282Props.children" :className="group8282Props.className" />
          <group828 :children="group8283Props.children" :className="group8283Props.className" />
          <group828 :children="group8284Props.children" :className="group8284Props.className" />
          <div class="rectangle-567 border-1px-mercury"></div>
          <div class="bonus-level lato-normal-sonic-silver-13px">{{ bonusLevel }}</div>
          <div class="place table-header">{{ place }}</div>
          <div class="progressstandard">
            <group453 />
            <div class="text-10 table-header">{{ text10 }}</div>
          </div>
          <ratingstars :star3="ratingstarsProps.star3" :star4="ratingstarsProps.star4" />
          <ratingstars
            :star3="ratingstars2Props.star3"
            :star4="ratingstars2Props.star4"
            :className="ratingstars2Props.className"
          />
          <ratingstars
            :star3="ratingstars3Props.star3"
            :star4="ratingstars3Props.star4"
            :className="ratingstars3Props.className"
          />
        </div>
      </div>
      <img class="path-751" :src="path751" />
      <div class="rectangle-591"></div>
      <div class="flex-row-9">
        <img class="bars-1" :src="bars2" />
        <div class="menu-1 h5">{{ menu2 }}</div>
      </div>
      <p class="text-7 lato-normal-black-14px">
        <span class="span0-4 h5">{{ spanText5 }}</span
        ><span class="span1-2 table-body">{{ spanText6 }}</span>
      </p>
      <div class="les-1-voortgang-1 lato-bold-cerise-36px-2">
        <span class="lato-bold-sonic-silver-36px">{{ spanText7 }}</span
        ><span class="lato-bold-cerise-36px">{{ spanText8 }}</span>
      </div>
      <group453 :className="group453Props.className" />
      <div class="text-8 table-header">{{ text8 }}</div>
      <buttonsecondary :className="buttonsecondaryProps.className" />
      <div class="flex-row-10">
        <group828 :children="group8285Props.children" :className="group8285Props.className" />
        <group828 :children="group8286Props.children" :className="group8286Props.className" />
        <div class="overlap-group-4 border-1px-mercury">
          <div class="bonus-level-1 lato-normal-sonic-silver-13px">{{ bonusLevel2 }}</div>
        </div>
      </div>
      <div class="flex-row-11">
        <img class="star-1" :src="star" /><img class="star" :src="star2" /><img class="star-2" :src="star3" /><img
          class="star"
          :src="star4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Buttonsecondary from "./Buttonsecondary";
import Group828 from "./Group828";
import Group453 from "./Group453";
import Ratingstars from "./Ratingstars";
export default {
  name: "RADBCompPageHeader",
  components: {
    Buttonsecondary,
    Group828,
    Group453,
    Ratingstars,
  },
  props: [
    "path747",
    "spanText",
    "spanText2",
    "bars",
    "menu",
    "rectangle578",
    "spanText3",
    "spanText4",
    "bonusLevel",
    "place",
    "text10",
    "path751",
    "bars2",
    "menu2",
    "spanText5",
    "spanText6",
    "spanText7",
    "spanText8",
    "text8",
    "bonusLevel2",
    "star",
    "star2",
    "star3",
    "star4",
    "group828Props",
    "group8282Props",
    "group8283Props",
    "group8284Props",
    "ratingstarsProps",
    "ratingstars2Props",
    "ratingstars3Props",
    "group453Props",
    "buttonsecondaryProps",
    "group8285Props",
    "group8286Props",
  ],
};
</script>

<style>
.radb-comp-pageheader {
  align-items: flex-start;
  background-color: var(--white);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 1246px;
  padding: 40px 0;
  position: relative;
  width: 1980px;
}

.group-900 {
  align-items: flex-start;
  align-self: center;
  display: flex;
  min-width: 1920px;
}

.overlap-group2-1 {
  height: 184px;
  position: relative;
  width: 1920px;
}

.path-747 {
  height: 64px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 1920px;
}

.text-9 {
  height: 21px;
  left: 295px;
  letter-spacing: 0;
  line-height: 14px;
  position: absolute;
  top: 24px;
  width: 590px;
}

.span0-4 {
  color: var(--black);
  font-weight: 700;
}

.span1-2 {
  color: var(--black);
}

.group-597 {
  align-items: center;
  display: flex;
  height: 17px;
  left: 49px;
  position: absolute;
  top: 24px;
}

.bars {
  height: 13px;
  margin-top: 1.23px;
  object-fit: cover;
  width: 18px;
}

.menu {
  align-self: flex-end;
  color: var(--black);
  font-weight: 700;
  line-height: 14px;
  margin-bottom: -2px;
  margin-left: 18px;
  min-height: 19px;
  min-width: 44px;
  white-space: nowrap;
}

.rectangle-578 {
  height: 36px;
  left: 1434px;
  object-fit: cover;
  position: absolute;
  top: 16px;
  width: 306px;
}

.rectangle-589 {
  background-color: var(--white);
  box-shadow: 0px 3px 5px #0000001a;
  height: 121px;
  left: 0;
  position: absolute;
  top: 63px;
  width: 1920px;
}

.les-1-voortgang {
  left: 47px;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  top: 106px;
  white-space: nowrap;
}

.rectangle-567 {
  border-radius: 4px;
  height: 25px;
  left: 999px;
  position: absolute;
  top: 110px;
  width: 132px;
}

.bonus-level {
  height: 19px;
  left: 1018px;
  letter-spacing: 0;
  line-height: 16px;
  position: absolute;
  text-align: center;
  top: 112px;
  white-space: nowrap;
  width: 96px;
}

.place {
  color: var(--black-4);
  height: 22px;
  left: 435px;
  line-height: 16px;
  position: absolute;
  top: 139px;
  width: 678px;
}

.progressstandard {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  left: 1264px;
  position: absolute;
  top: 110px;
  width: 607px;
}

.text-10 {
  color: var(--black-4);
  height: 22px;
  line-height: 16px;
  margin-top: 4px;
  width: 607px;
}

.path-751 {
  align-self: center;
  height: 64px;
  margin-top: 126px;
  object-fit: cover;
  width: 1920px;
}

.rectangle-591 {
  align-self: center;
  background-color: var(--white);
  box-shadow: 0px 3px 5px #0000001a;
  height: 121px;
  margin-top: 64px;
  width: 1920px;
}

.flex-row-9 {
  align-items: center;
  display: flex;
  height: 19px;
  margin-left: 164px;
  margin-top: 134px;
  min-width: 80px;
}

.bars-1 {
  height: 13px;
  margin-bottom: 0.77px;
  object-fit: cover;
  width: 18px;
}

.menu-1 {
  color: var(--black);
  font-weight: 700;
  line-height: 14px;
  margin-left: 18px;
  min-height: 19px;
  min-width: 44px;
  white-space: nowrap;
}

.text-7 {
  height: 21px;
  letter-spacing: 0;
  line-height: 14px;
  margin-left: 165.21px;
  margin-top: 25px;
  width: 590px;
}

.les-1-voortgang-1 {
  letter-spacing: 0;
  line-height: 30px;
  margin-left: 164px;
  margin-top: 28px;
  min-height: 46px;
  white-space: nowrap;
}

.text-8 {
  color: var(--black-4);
  height: 22px;
  line-height: 16px;
  margin-left: 164.15px;
  margin-top: 4px;
  width: 607px;
}

.flex-row-10 {
  align-items: flex-start;
  display: flex;
  margin-left: 164px;
  margin-top: 41px;
  min-width: 447px;
  position: relative;
}

.overlap-group-4 {
  align-items: flex-start;
  border-radius: 4px;
  display: flex;
  height: 25px;
  margin-left: 24px;
  min-width: 132px;
  padding: 1.5px 18px;
}

.bonus-level-1 {
  height: 19px;
  letter-spacing: 0;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
  width: 96px;
}

.flex-row-11 {
  align-items: flex-start;
  display: flex;
  margin-left: 164px;
  margin-top: 40px;
  min-width: 65px;
}

.star-1 {
  height: 13px;
  object-fit: cover;
  width: 13px;
}

.star {
  height: 13px;
  margin-left: 3px;
  object-fit: cover;
  width: 13px;
}

.star-2 {
  height: 13px;
  margin-left: 4px;
  object-fit: cover;
  width: 13px;
}
</style>
