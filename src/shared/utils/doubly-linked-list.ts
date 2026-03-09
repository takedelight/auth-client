class Node<T> {
  value: T
  next: Node<T> | null
  prev: Node<T> | null

  constructor(
    value: T,
    next: Node<T> | null = null,
    prev: Node<T> | null = null
  ) {
    this.value = value
    this.next = next
    this.prev = prev
  }

  toString(cb: (val: T) => string) {
    return cb ? cb(this.value) : `${this.value}`
  }
}

export class DoublyLinkedList<T> {
  head: Node<T> | null
  tail: Node<T> | null
  length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  prepend(value: T) {
    const node = new Node(value, this.head)

    if (this.head) {
      this.head.prev = node
    }

    this.head = node

    if (!this.tail) {
      this.tail = node
    }

    return this
  }

  append(value: T) {
    if (!this.head || !this.tail) {
      return this.prepend(value)
    }

    const node = new Node(value)

    this.tail.next = node
    node.prev = this.tail
    this.tail = node

    return this
  }
}
