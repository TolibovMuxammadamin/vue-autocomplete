import {throttle} from "@/components/autcomplete/utils";

export default {
  name: 'autocomplete',
  props: {
    value: [Boolean, Number, String, Object, Array],
    items: {
      type: Array,
      default: function () {
        return [];
      }
    },
    itemValue: {
      type: String,
      default: '',
    },
    itemLabel: {
      type: String,
      default: '',
    },
    inputSearch: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    showList: false,
    inputValue: '',
    dataObject: [Number, String, Object, Array],
    findingItems: [],
    f100: null
  }),
  methods: {
    changeValue (item) {
      this.dataObject = item;
      this.inputValue = this.getItemLabel(item);
      const val = this.itemValue.length > 0 ? this.dataObject[this.itemValue] : this.dataObject;
      this.emitInput(val);
    },
    onSearch (event) {
      let inputValue = this.inputValue = event.target.value;

      if (inputValue === this.getItemLabel(this.dataObject) || inputValue.length === 0) {
        this.findingItems = this.items;
      }
      else if (inputValue.length > 0) {
        this.findingItems = [];
        this.items.forEach(item => {
          let itemIndex = this.getItemLabel(item).toLowerCase().search(inputValue.toLowerCase());
          if (itemIndex !== -1) this.findingItems.push(item);
        })
      }
    },
    initData () {
      if (this.items.length > 0 && this.value) {
        this.dataObject = this.items.find(item => {
          if (this.itemValue.length > 0) {
            return item[this.itemValue] === this.value;
          } else {
            return JSON.stringify(item) === JSON.stringify(this.value);
          }
        });
        this.inputValue = this.getItemLabel(this.dataObject);
      }
    },
    onEnter () {
      this.showList = false;
      this.changeValue(this.findingItems[0]);
    },
    onBlur () {
      this.showList = false;
      if (this.value) this.inputValue = this.getItemLabel(this.dataObject);
      this.findingItems = this.items;
    },
    emitInput (value) {
      this.$emit('input', value)
    },
    isSelected (item)  {
      return this.itemValue.length > 0 ? this.value === item[this.itemValue] : this.value === item
    },
    getItemLabel (item)  {
      return this.itemLabel.length > 0 ? item[this.itemLabel] : item
    },
    clearValue () {
      this.dataObject = [Number, String, Object, Array];
      this.inputValue = '';
      this.$emit('input', undefined);
    },
    updateInputSearch (val) {
      this.$emit('update:inputSearch', val);
    }
  },
  computed: {

  },
  watch: {
    items () {
      this.findingItems = this.items;
      this.initData();
    },
    inputValue (val) {
      this.f100(val);
    }
  },
  created() {
    this.findingItems = this.items;
    this.initData();
    this.f100 = throttle(this.updateInputSearch, 1000)
  }
}