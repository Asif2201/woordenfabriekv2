<template>
  <div class="container-center-horizontal">
    <div class="radb-comp-learningobject screen" onclick="window.open('radb-comp-headers-text.html', '_self');">
      <div class="flex-col-2">
        <div class="flex-col-3">
          <div class="overlap-group1-1">
            <div class="text-4">
              <span class="span0-2 h1">{{ spanText }}</span
              ><span class="h1">{{ spanText2 }}</span>
            </div>
            <p class="text-5 paragraph">{{ text5 }}</p>
          </div>
          <div class="flex-row-2">
            <div class="ongeluk">{{ ongeluk }}</div>
            <div class="overlap-group3 border-1px-alto">
              <div class="on">{{ on }}</div>
            </div>
            <div class="text-header">{{ textHeader }}</div>
          </div>
          <div class="flex-row-3">
            <div class="overlap-group2 border-1px-alto">
              <div class="over">{{ over }}</div>
            </div>
            <div class="text-body paragraph">{{ textBody }}</div>
          </div>
          <div class="flex-row-4">
            <div class="buttondisabled">
              <div class="group-152-2">
                <div class="ok lato-bold-nobel-12px">{{ ok }}</div>
              </div>
            </div>
            <div class="buttonprimary">
              <div class="overlap-group-2">
                <div class="rectangle-451-2"></div>
                <div class="ok-1 h5">{{ ok2 }}</div>
              </div>
            </div>
            <div class="buttondefault">
              <div class="overlap-group-2">
                <div class="rectangle-25-1"></div>
                <div class="wis h5">{{ wis }}</div>
              </div>
            </div>
            <div class="rectangle-592 border-1px-alto"></div>
          </div>
        </div>
        <div class="flex-row-5">
          <div class="flex-col-4">
            <div class="buttondefault-1">
              <div class="overlap-group5">
                <div class="rectangle-25-2"></div>
                <div class="klaar">{{ klaar }}</div>
              </div>
            </div>
            <div class="address lato-bold-persian-green-18px-2">
              <span class="lato-bold-malachite-18px">{{ spanText3 }}</span
              ><span class="lato-bold-sonic-silver-18px">{{ spanText4 }}</span
              ><span class="lato-bold-alizarin-crimson-18px">{{ spanText5 }}</span
              ><span class="lato-bold-sonic-silver-18px">{{ spanText6 }}</span
              ><span class="lato-bold-persian-green-18px">{{ spanText7 }}</span>
            </div>
            <div class="buttonicon">
              <div class="text-6">{{ text6 }}</div>
            </div>
          </div>
          <div class="surname lato-bold-persian-green-18px-2">
            <span class="span0-3 h3">{{ spanText8 }}</span
            ><span class="lato-bold-sonic-silver-18px">{{ spanText9 }}</span
            ><span class="span2">{{ spanText10 }}</span
            ><span class="lato-bold-sonic-silver-18px">{{ spanText11 }}</span
            ><span class="lato-bold-persian-green-18px">{{ spanText12 }}</span
            ><span class="lato-bold-malachite-18px">{{ spanText13 }}</span
            ><span class="lato-bold-persian-green-18px">{{ spanText14 }}</span
            ><span class="lato-bold-alizarin-crimson-18px">{{ spanText15 }}</span
            ><span class="lato-bold-persian-green-18px">{{ spanText16 }}</span
            ><span class="lato-bold-persian-green-18px">{{ spanText17 }}</span>
          </div>
        </div>
        <div class="dropdown card-small-user-title">{{ dropdown }}</div>
        <div class="flex-row-6">
          <div class="selectable h2">{{ selectable }}</div>
          <div class="selected h2">{{ selected }}</div>
          <div class="correct h2">{{ correct }}</div>
          <div class="incorrect h2">{{ incorrect }}</div>
          <div class="overlap-group-3 border-1px-alto">
            <div class="flex-row-7">
              <div class="unselectable">{{ unselectable }}</div>
              <img class="caret-down" :src="caretDown" />
            </div>
            <div class="overlap-group1-2">
              <div class="overlap-group7">
                <div class="rectangle-139"></div>
                <div class="selected-1 h5">{{ selected2 }}</div>
                <div class="group-295">
                  <div class="overlap-group4-1">
                    <img class="rectangle-140" :src="rectangle140" />
                    <div class="ellipse-6"></div>
                  </div>
                </div>
              </div>
              <div class="selectable-1 table-body">{{ selectable2 }}</div>
              <div class="selectable-2 table-body">{{ selectable3 }}</div>
              <img class="line-3" :src="line3" /><img class="line-4" :src="line4" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex-row-8">
        <img class="line-236" :src="line236" />
        <div class="over-1 lato-bold-eerie-black-28px">{{ over2 }}</div>
        <img class="line-237" :src="line237" /><img class="line-23" :src="line239" />
        <div class="kwalific lato-bold-eerie-black-28px">{{ kwalific }}</div>
        <img class="line-240" :src="line240" /><img class="line-23" :src="line238" />
        <div class="atie lato-bold-eerie-black-28px">{{ atie }}</div>
        <img class="line-5" :src="line5" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RADBCompLearningObject",
  props: [
    "spanText",
    "spanText2",
    "text5",
    "ongeluk",
    "on",
    "textHeader",
    "over",
    "textBody",
    "ok",
    "ok2",
    "wis",
    "klaar",
    "spanText3",
    "spanText4",
    "spanText5",
    "spanText6",
    "spanText7",
    "text6",
    "spanText8",
    "spanText9",
    "spanText10",
    "spanText11",
    "spanText12",
    "spanText13",
    "spanText14",
    "spanText15",
    "spanText16",
    "spanText17",
    "dropdown",
    "selectable",
    "selected",
    "correct",
    "incorrect",
    "unselectable",
    "caretDown",
    "selected2",
    "rectangle140",
    "selectable2",
    "selectable3",
    "line3",
    "line4",
    "line236",
    "over2",
    "line237",
    "line239",
    "kwalific",
    "line240",
    "line238",
    "atie",
    "line5",
  ],
};
</script>

<style>
.radb-comp-learningobject {
  align-items: flex-start;
  background-color: var(--white);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 1178px;
  overflow: hidden;
  padding: 53px 0;
  width: 1980px;
}

.flex-col-2 {
  align-items: flex-start;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  margin-right: -113px;
  min-height: 920px;
  width: 2042px;
}

.flex-col-3 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  min-height: 449px;
  width: 1641px;
}

.overlap-group1-1 {
  align-items: flex-start;
  background-color: var(--black-3);
  display: flex;
  flex-direction: column;
  min-height: 157px;
  padding: 36px 61px;
  width: 1641px;
}

.text-4 {
  color: var(--white);
  font-family: var(--font-family-lato);
  font-size: var(--font-size-xxl);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 36px;
  margin-top: 12px;
  min-height: 36px;
  white-space: nowrap;
}

.span0-2 {
  color: var(--pink);
}

.text-5 {
  color: #ffffff99;
  line-height: 22px;
  margin-bottom: -1px;
  margin-top: 16px;
  min-height: 21px;
  white-space: nowrap;
}

.flex-row-2 {
  align-items: flex-start;
  display: flex;
  height: 48px;
  margin-left: 19px;
  margin-top: 116px;
  min-width: 1496px;
}

.ongeluk {
  align-self: center;
  color: var(--grey);
  font-family: var(--font-family-lato);
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: 0.72px;
  line-height: 36px;
  margin-top: 3px;
  min-height: 31px;
  min-width: 91px;
  white-space: nowrap;
}

.overlap-group3 {
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 4px;
  display: flex;
  height: 38px;
  justify-content: flex-end;
  margin-left: 587px;
  min-width: 248px;
  padding: 6px 19px;
}

.on {
  color: var(--red);
  font-family: var(--font-family-lato);
  font-size: var(--font-size-l);
  letter-spacing: 0;
  line-height: 18px;
  min-height: 24px;
  min-width: 23px;
  text-align: right;
  white-space: nowrap;
}

.text-header {
  align-self: flex-end;
  color: var(--grey);
  font-family: var(--font-family-lato);
  font-size: var(--font-size-xxl);
  font-weight: 700;
  letter-spacing: 0.84px;
  line-height: 36px;
  margin-left: 414px;
  min-height: 36px;
  min-width: 156px;
  text-align: center;
  white-space: nowrap;
}

.flex-row-3 {
  align-items: flex-start;
  align-self: flex-end;
  display: flex;
  height: 55px;
  margin-right: 211px;
  margin-top: 4px;
  min-width: 733px;
}

.overlap-group2 {
  align-items: flex-start;
  align-self: flex-end;
  background-color: var(--white);
  border-radius: 4px;
  display: flex;
  height: 38px;
  justify-content: flex-end;
  min-width: 248px;
  padding: 6px 19px;
}

.over {
  color: var(--green);
  font-family: var(--font-family-lato);
  font-size: var(--font-size-l);
  letter-spacing: 0;
  line-height: 18px;
  min-height: 24px;
  min-width: 38px;
  text-align: right;
  white-space: nowrap;
}

.text-body {
  color: var(--black);
  line-height: 22px;
  margin-left: 414px;
  min-height: 21px;
  white-space: nowrap;
}

.flex-row-4 {
  align-items: flex-start;
  display: flex;
  height: 69px;
  margin-left: 16px;
  min-width: 929px;
}

.buttondisabled {
  align-items: flex-start;
  background-color: var(--bon-jour);
  border-radius: 4px;
  display: flex;
  min-width: 91px;
}

.group-152-2 {
  align-items: flex-end;
  display: flex;
  height: 36px;
  padding: 8px 34px;
  width: 91px;
}

.ok {
  letter-spacing: 0;
  line-height: 12px;
  margin-left: 2px;
  min-height: 17px;
  min-width: 20px;
  text-align: center;
  white-space: nowrap;
}

.buttonprimary {
  align-items: flex-start;
  display: flex;
  margin-left: 57px;
  min-width: 93px;
}

.overlap-group-2 {
  height: 36px;
  position: relative;
  width: 93px;
}

.rectangle-451-2 {
  background-color: var(--blue);
  border-radius: 4px;
  height: 36px;
  left: 0;
  position: absolute;
  top: 0;
  width: 91px;
}

.ok-1 {
  color: var(--white);
  font-weight: 700;
  height: 21px;
  left: 0;
  line-height: 14px;
  position: absolute;
  text-align: center;
  top: 9px;
  width: 93px;
}

.buttondefault {
  align-items: flex-start;
  display: flex;
  margin-left: 55px;
  min-width: 93px;
}

.rectangle-25-1 {
  background-color: var(--bon-jour);
  border-radius: 4px;
  height: 36px;
  left: 0;
  position: absolute;
  top: 0;
  width: 91px;
}

.wis {
  color: var(--black);
  font-weight: 700;
  height: 21px;
  left: 0;
  line-height: 14px;
  position: absolute;
  text-align: center;
  top: 9px;
  width: 93px;
}

.rectangle-592 {
  align-self: flex-end;
  background-color: var(--white);
  border-radius: 4px;
  height: 38px;
  margin-left: 292px;
  width: 248px;
}

.flex-row-5 {
  align-items: flex-start;
  align-self: flex-end;
  display: flex;
  height: 246px;
  margin-top: 27px;
  min-width: 2026px;
}

.flex-col-4 {
  align-items: flex-start;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  min-height: 244px;
  width: 230px;
}

.buttondefault-1 {
  align-items: flex-start;
  display: flex;
  min-width: 162px;
}

.overlap-group5 {
  height: 62px;
  position: relative;
  width: 162px;
}

.rectangle-25-2 {
  background-color: var(--bon-jour);
  border-radius: 4px;
  height: 62px;
  left: 0;
  position: absolute;
  top: 0;
  width: 160px;
}

.klaar {
  color: var(--black);
  font-family: var(--font-family-lato);
  font-size: 22px;
  font-weight: 700;
  height: 20px;
  left: 0;
  letter-spacing: 0;
  line-height: 22px;
  position: absolute;
  text-align: center;
  top: 17px;
  white-space: nowrap;
  width: 162px;
}

.address {
  letter-spacing: 0.54px;
  line-height: 64px;
  margin-bottom: -40px;
  margin-left: 2px;
  margin-top: 45px;
  min-height: 24px;
  min-width: 228px;
  text-align: right;
  white-space: nowrap;
}

.buttonicon {
  align-items: flex-start;
  background-color: var(--bon-jour);
  border-radius: 4px;
  display: flex;
  height: 36px;
  justify-content: flex-end;
  margin-left: 2px;
  margin-top: 77px;
  min-width: 46px;
  padding: 0 15px;
}

.text-6 {
  color: #212121;
  font-family: var(--font-family-lato);
  font-size: var(--font-size-xl);
  letter-spacing: 0;
  line-height: 30px;
  min-height: 31px;
  min-width: 14px;
  text-align: center;
  white-space: nowrap;
}

.surname {
  height: 129px;
  letter-spacing: 0.54px;
  line-height: 64px;
  margin-left: 1113px;
  width: 683px;
}

.span0-3 {
  color: var(--black-2);
  font-weight: 700;
}

.span2 {
  color: var(--blue);
  font-family: var(--font-family-lato);
  font-size: var(--font-size-l);
  font-weight: 700;
}

.dropdown {
  align-self: center;
  color: #333333de;
  font-weight: 700;
  line-height: 13px;
  margin-left: 732px;
  margin-top: 13px;
  min-height: 18px;
  min-width: 64px;
  white-space: nowrap;
}

.flex-row-6 {
  align-items: flex-start;
  display: flex;
  height: 162px;
  margin-left: 16px;
  margin-top: 4px;
  min-width: 1585px;
}

.selectable {
  color: var(--black-2);
  font-weight: 700;
  line-height: 30px;
  margin-top: 29.5px;
  min-height: 31px;
  min-width: 110px;
  text-align: center;
  text-decoration: underline;
  white-space: nowrap;
}

.selected {
  color: var(--blue);
  font-weight: 700;
  line-height: 30px;
  margin-left: 38px;
  margin-top: 29.5px;
  min-height: 31px;
  min-width: 90px;
  text-align: center;
  white-space: nowrap;
}

.correct {
  color: var(--green);
  font-weight: 700;
  line-height: 30px;
  margin-left: 49px;
  margin-top: 29.5px;
  min-height: 31px;
  min-width: 78px;
  text-align: center;
  white-space: nowrap;
}

.incorrect {
  color: var(--red);
  font-weight: 700;
  line-height: 30px;
  margin-left: 37px;
  margin-top: 29.5px;
  min-height: 31px;
  min-width: 98px;
  text-align: center;
  white-space: nowrap;
}

.overlap-group-3 {
  align-items: center;
  background-color: var(--white);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-left: 837px;
  min-height: 162px;
  width: 248px;
}

.flex-row-7 {
  align-items: center;
  display: flex;
  height: 19px;
  margin-right: 2.72px;
  margin-top: 14px;
  min-width: 211px;
}

.unselectable {
  color: #9b9b9b;
  font-family: var(--font-family-lato);
  font-size: var(--font-size-s);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 14px;
  min-height: 19px;
  min-width: 79px;
  white-space: nowrap;
}

.caret-down {
  height: 5px;
  margin-bottom: 6.69px;
  margin-left: 124px;
  object-fit: cover;
  width: 8px;
}

.overlap-group1-2 {
  height: 125px;
  margin-left: 2px;
  margin-top: 4px;
  position: relative;
  width: 246px;
}

.overlap-group7 {
  height: 125px;
  left: 0;
  position: absolute;
  top: 0;
  width: 246px;
}

.rectangle-139 {
  background-color: #f8f8f8;
  height: 37px;
  left: 0;
  position: absolute;
  top: 0;
  width: 245px;
}

.selected-1 {
  color: var(--licorice);
  font-weight: 700;
  left: 15px;
  line-height: 14px;
  position: absolute;
  top: 9px;
  white-space: nowrap;
}

.group-295 {
  align-items: flex-start;
  display: flex;
  height: 125px;
  left: 234px;
  position: absolute;
  top: 0;
}

.overlap-group4-1 {
  height: 125px;
  position: relative;
  width: 12px;
}

.rectangle-140 {
  height: 124px;
  left: 1px;
  object-fit: cover;
  position: absolute;
  top: 1px;
  width: 10px;
}

.ellipse-6 {
  background-color: #adadad;
  border-radius: 6px/7.5px;
  height: 15px;
  left: 0;
  position: absolute;
  top: 0;
  width: 12px;
}

.selectable-1 {
  color: var(--licorice);
  left: 15px;
  line-height: 14px;
  position: absolute;
  top: 84px;
  white-space: nowrap;
}

.selectable-2 {
  color: var(--licorice);
  left: 15px;
  line-height: 14px;
  position: absolute;
  top: 46px;
  white-space: nowrap;
}

.line-3 {
  height: 1px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 74px;
  width: 207px;
}

.line-4 {
  height: 1px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 111px;
  width: 207px;
}

.flex-row-8 {
  align-items: flex-start;
  display: flex;
  margin-left: 69.5px;
  min-width: 1544px;
}

.line-236 {
  height: 49px;
  object-fit: cover;
  width: 1px;
}

.over-1 {
  letter-spacing: 0.84px;
  line-height: 36px;
  margin-left: 80px;
  margin-top: 1.5px;
  min-height: 36px;
  min-width: 66px;
  text-align: center;
  white-space: nowrap;
}

.line-237 {
  height: 49px;
  margin-left: 99px;
  object-fit: cover;
  width: 1px;
}

.line-23 {
  height: 49px;
  margin-left: 26px;
  object-fit: cover;
  width: 1px;
}

.kwalific {
  letter-spacing: 0.84px;
  line-height: 36px;
  margin-left: 72px;
  margin-top: 1.5px;
  min-height: 36px;
  min-width: 104px;
  text-align: center;
  white-space: nowrap;
}

.line-240 {
  height: 49px;
  margin-left: 70px;
  object-fit: cover;
  width: 1px;
}

.atie {
  letter-spacing: 0.84px;
  line-height: 36px;
  margin-left: 97px;
  margin-top: 1.5px;
  min-height: 36px;
  min-width: 52px;
  text-align: center;
  white-space: nowrap;
}

.line-5 {
  align-self: center;
  height: 1px;
  margin-bottom: 2px;
  margin-left: 640px;
  object-fit: cover;
  width: 207px;
}
</style>
