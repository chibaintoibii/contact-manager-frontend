<template>
  <div class="text-center mt-5">
    <span class="loader"></span>
  </div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>
.loader {
  width: 80px;
  height: 80px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>