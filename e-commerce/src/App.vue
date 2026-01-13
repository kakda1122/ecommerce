<template>
  <div id="app">
    <HeaderComponent />
    <main class="main-content">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.main-content {
  flex: 1;
}
</style>