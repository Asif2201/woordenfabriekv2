<template>
  <div class="modal-backdrop2">
    <div id="a2" :style="cssProps">
      <header class="modal-header2">
        <slot name="header2">
        </slot>
        <button
          type="button"
          class="btn-close2"
          @click="close"
        >
          x
        </button>
      </header>
      <section class="modal-body2">
        <slot name="body">
        </slot>
       </section>
      <footer class="modal-footer2">
        <slot name="footer">
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    props:  [
      'Top',
      'Left',
      'width',
      'height'
    ],
    computed: {
      cssProps()  {
        return{
          '--modal-top': this._props.Top,
          '--modal-left': this._props.Left,
          '--modal-width': this._props.width,
          '--modal-height': this._props.height,
        }
      }
    },
    name: 'modalChallenge',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>
<style>
  #a2  {
    background: #FCFFF5;
    position: absolute;
    top: var(--modal-top);
    left: var(--modal-left);
    width: var(--modal-width);
    height: var(--modal-height);
  }
  .modal-backdrop2 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }


  .modal-header2,
  .modal-footer2 {
    display: flex;
  }

  .modal-header2 {
    position: relative;
    font-family: lato;
    font-size: 12px;
    color: black;
    align-self: right;
    vertical-align: text-top;
  }

  .modal-footer2 {
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body2 {
    position: relative;
    font-family: lato;
    font-size: 14px;
    color: black;
    align-self: center;
    vertical-align: text-top;
  }

  .btn-close2 {
    position: relative;
    top: 0;
    right:0px;
    border: none;
    padding-left: 2px;
    padding-bottom: 3px;
    padding-right: 3px;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: grey;
    background: lightgray;
  }


</style>
