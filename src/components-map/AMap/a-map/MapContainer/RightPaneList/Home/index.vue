<template>
  <Tabs class="tabs-container" v-model="currentTab">
    <TabPanel key="realTime" name="realTime" label="态势感知" lazy>
      <realTime :data="data" />
    </TabPanel>
    <TabPanel key="overlayList" name="overlayList" label="点位列表" lazy>
      <overlayList />
    </TabPanel>
  </Tabs>
</template>

<script>
import { Tabs, TabPanel } from "../Tabs/";
import overlayList from "./overlayList";
import realTime from "./realTime";
export default {
  name: "RightlistPanel",
  data() {
    return {
      activeIndex: null,
      currentTab: "realTime",
    };
  },
  components: {
    Tabs,
    TabPanel,
    overlayList,
    realTime,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    activeItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    activeItem(val) {
      if (JSON.stringify(val) == "{}") {
        return (this.activeIndex = null);
      }
      let index = this.data.findIndex((item) => {
        let { id } = item;
        return val.id === id;
      });
      this.activeIndex = index > -1 ? index : null;
    },
  },
  methods: {
    handleClick(item, index) {
      this.activeIndex = index;
      this.$emit("change", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-container {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
