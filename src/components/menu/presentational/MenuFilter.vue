<template>
  <div id="filter" class="filter">
    <div id="all" class="item">
      <ButtonBadge
        icon="all"
        name="all products"
        :selected="!filterId"
        @button-clicked="onFilterClicked()"
      />
    </div>

    <div
      class="item"
      v-for="category of categories"
      :key="category"
      :id="category"
    >
      <ButtonBadge
        :icon="category"
        :name="category"
        :selected="filterId === category"
        @button-clicked="onFilterClicked(category)"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, onMounted } from "vue";
  import ButtonBadge from "@/components/shared/buttons/ButtonBadge.vue";
  import { scrollToLeft } from "@/utils/AnimationUtil";

  export default defineComponent({
    name: "MenuFilter",
    props: {
      filterId: String,
      categories: Array as () => string[]
    },
    components: {
      ButtonBadge
    },
    setup(props, { emit }) {
      const scrollElementTo = (id?: string) => {
        const target: HTMLElement = document.getElementById("filter");
        const element: HTMLElement = document.getElementById(id ? id : "all");
        const x: number = element ? element.offsetLeft - 25 : 0;

        // auxiliar vanila script to have a smooth scroll across all devices
        scrollToLeft(target, x);

        // doesn't work on ios devices, works only for web
        // target.scrollTo({ left: x, behavior: "smooth" });
      };

      onMounted(async () => {
        scrollElementTo(props.filterId);
      });

      watch(
        () => props.filterId,
        (newValue: string) => {
          scrollElementTo(newValue);
        }
      );

      const onFilterClicked = (filterId: string) => {
        emit("filter-clicked", filterId);
      };

      return { onFilterClicked };
    }
  });
</script>

<style scoped lang="scss">
  .filter {
    width: 100vw;
    margin-left: -$app-horizontal;
    padding: 0 $app-horizontal;
    overflow-x: auto;
    white-space: nowrap;

    .item {
      // white-space: normal;
      display: inline-block;

      &:not(:last-child) {
        margin-right: $padding;
      }
    }
  }
</style>
