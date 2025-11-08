
  <template>
  <div id="app">
    <CategoryComponent />
    <PromotionComponent />
  </div>
</template>

<script>
import CategoryComponent from './components/CategoryComponent.vue';
import PromotionComponent from './components/PromotionComponent.vue';

export default {
  name: 'App',
  components: {
    CategoryComponent,
    PromotionComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
   display: flex;
  flex-direction: column; 
  background-color: white;
  

}
</style>