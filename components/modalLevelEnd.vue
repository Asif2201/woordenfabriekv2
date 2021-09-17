<template>
  <div class="modal-backdrop">
    <div id="a" :style="cssProps">
      <header class="modal-header">
        <img src="~/assets/radb_img_level-end@4x.png" width="150" height="200" />
      </header>
      <section class="modal-body">
        <slot name="body">
        </slot>
       </section>
      <footer class="modal-footer">
        <slot name="footer">
        </slot>
      </footer>
      <button
          type="button"
          class="btn-green"
          @click="close"
        >
        Volgende Level
      </button>
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
    color: #4AAE9B;
    justify-content: space-between;
    text-align: center;
    left: 100px;
    border:none;
  }

  .modal-footer {
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    font-family: lato;
    font-size: 24px;
    color: darksalmon;
    font-weight: bold;
    text-align: center;
    vertical-align:middle;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: darkgray;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: blue;
    border: 1px solid blue;
    border-radius: 2px;
    font-family: lato;
    font-size: 16px;
    text-align: center;
    position: absolute;
    top: 250px;
    left: 130px;
    padding: 10px;
    border-radius: 4px;

  }
</style>
