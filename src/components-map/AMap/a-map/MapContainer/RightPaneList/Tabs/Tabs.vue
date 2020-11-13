<script>
export default {
  name: "Tabs",

  provide() {
    return {
      rootTabs: this,
    };
  },

  props: {
    value: String,
  },

  data() {
    return {
      currentName: this.value,
      panes: [],
    };
  },

  watch: {
    value(value) {
      this.setCurrentName(value);
    },
  },

  methods: {
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(
          (vnode) =>
            vnode.tag &&
            vnode.componentOptions &&
            vnode.componentOptions.Ctor.options.name === "TabPane"
        );
        const panes = paneSlots.map(
          ({ componentInstance }) => componentInstance
        );
        this.panes = panes;
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    handleTabClick(tab, tabName, event) {
      this.setCurrentName(tabName);
      this.$emit("tab-click", tab, event);
    },
    setCurrentName(value) {
      this.currentName = value;
      this.$emit("input", value);
    },
  },

  render(h) {
    let { panes ,handleTabClick} = this;

    const navData = {
      props: {
        panes,
      },
      ref: "nav",
    };
    const header = (
      <div class="tabs__header">
        {panes.map((panel) => {
          return <div on-click={(e)=>handleTabClick(panel,panel.name,e)} class={panel.active?'active':''}>{panel.label}</div>;
        })}
      </div>
    );
    const panels = <div class="tabs__content">{this.$slots.default}</div>;

    return <div class="tabs">{[header, panels]}</div>;
  },

  mounted() {
    this.calcPaneInstances();
  },
};
</script>
<style lang="scss" scoped>
.tabs{
    padding-top:48px;
    .tabs__header {
  background: #051040;
  border: 1px solid #1773C9;
  box-sizing: border-box;
  line-height: 46px;
  display: flex;
  font-size: 24px;
  position: absolute;
  top:0;
  right: 0;
  left: 0;
  cursor: pointer;
  user-select: none;
  color: rgba(255, 255, 255, 0.6);
  > div {
    flex: 1;
    text-align: center;
    position: relative;
    &.active {
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      &::after{
          content: "";
    width: 0;
    height: 0;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 8px 4px;
    border-style: solid;
    border-color: transparent transparent #00DDFF;
      }
    }
  }
  &:before,
  &:after {
    content: " ";
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #1773C9;
    height: 24px;
    width: 3px;
  }
  &:before{
    left: 0;
  }
  &:after {
    right: 0;
  }
}
}

</style>