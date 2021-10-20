<template>
  <div class="modal-backdrop">
    <div id="a" :style="cssProps">
      <header class="modal-header">
        <slot name="header">
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>
      <section class="modal-body">
        <slot name="body">
        </slot>
       </section>
      <footer class="modal-footer">
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
          '--modal-height': this._props.height
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
  #a  {
    background: #FCFFF5;
    position: absolute;
    top: var(--modal-top);
    left: var(--modal-left);
    width: var(--modal-width);
    height: var(--modal-height);
  }
  .modal-backdrop {
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


  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    font-family: lato;
    font-size: 12px;
    color: black;
    align-self: center;
    vertical-align: text-top;
  }

  .modal-footer {
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    font-family: lato;
    font-size: 14px;
    color: black;
    align-self: center;
    vertical-align: text-top;
  }

  .btn-close {
    position: relative;
    top: 0;
    right:0;
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: darkgray;
    background: transparent;
  }


</style>
