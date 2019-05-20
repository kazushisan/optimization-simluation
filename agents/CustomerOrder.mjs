import Customer from './Customer'

class CustomerOrder extends Customer {
  firstFacility(universe) {
    // 参照渡しをしない
    this.order = [...universe.order]
    return this.order.pop()
  }

  // 次の施設のインデックスを返す．もし次のインデックスがない場合は-1を返す
  nextFacility() {
    if (this.order.length > 0) {
      return this.order.pop()
    } else {
      return -1
    }
  }
}

export default CustomerOrder