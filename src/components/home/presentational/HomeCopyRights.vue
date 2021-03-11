<template>
  <div class="copyright">
    <ul>
      <li>
        This project is used as reference only;
      </li>
      <li>
        The idea is illustrate how to implement a real project using different
        programming languages;
      </li>
      <li>
        These are merely illustrative images and should not be used in
        commercial projects.
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "HomeCopyRights"
  });
</script>

<style scoped lang="scss">
  .copyright {
    display: flex;
    flex-flow: column;
    align-items: center;

    ul {
      list-style: none;
      color: $text-dark-secondary;
      // font-size: 14px;

      li {
        position: relative;
        margin-left: 20px;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &:before {
          content: "";
          position: absolute;
          border-right: 2px solid $primary-color;
          border-bottom: 2px solid $primary-color;
          width: 10px;
          height: 10px;
          top: 12px; // calc(50% - 4px);
          left: -25px;
          transform: translateY(-50%) rotate(-45deg);
        }
      }
    }
  }
</style>
