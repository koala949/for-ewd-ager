import { useEffect } from "react";
import { useState } from "react";
import { useWindowSize } from 'react-use'
import { useRef } from "react";
import { isDom } from "@/utils/base";

/**
 * 测量dom元素的位置和大小
 * @returns {{ ref, size }}
 */
export default function useMeasure (element) {
  const ref = useRef()
  const [size, setSize] = useState({})
  const { height: windowHeight, width: windowWidth } = useWindowSize()

  function updateSize (el) {
    function getElementTop () {
      let actualTop = el.offsetTop;
      let current = el.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    }
    function getElementLeft () {
      let actualLeft = el.offsetLeft;
      let current = el.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      return actualLeft;
    }

    const top = getElementTop()
    const left = getElementLeft()
    setSize({
      top,
      left,
      width: el.offsetWidth,
      height: el.offsetHeight,
      adaptiveHeight: windowHeight - top,
      adaptiveWidth: windowWidth - left,
    })
  }

  useEffect(() => {
    const _element = isDom(element) ? element : ref.current
    if (_element) {
      updateSize(_element)
    }
  }, [ref.current, element, windowHeight, windowWidth])  // eslint-disable-line

  return [ref, size];
}
