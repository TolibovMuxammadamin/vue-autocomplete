<template>
    <div class="wrapper">
      <label v-if="label.length > 0" for="input">{{ label }}</label>
      <div class="input-group">
        <input v-model="inputValue"
               :placeholder="placeholder"
               :class="{
                 clearable
               }"
               @keyup.enter="onEnter"
               @input="onSearch"
               @focus="showList = true"
               @blur="onBlur"
               ref="input"
               id="input"
               type="text"
               autocomplete="off">
        <button v-if="clearable"
                @click="clearValue"
                class="btn-clear">
        </button>
      </div>
      <transition name="fade">
        <ul v-if="showList" class="list">
          <template v-if="findingItems.length > 0">
            <li v-for="(item, index) in findingItems"
                @click="changeValue(item)"
                :class="{
                active: isSelected(item)
              }"
                :key="index">
              <slot name="item"
                    :item="item">
                {{ item[itemLabel] }}
              </slot>
            </li>
          </template>
          <li v-else>
            No data found
          </li>
        </ul>
      </transition>
    </div>
</template>

<script src="./script.js">
</script>

<style lang="scss" scoped>
  @import "style";
</style>