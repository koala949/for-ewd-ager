import { Button } from "antd";
import { useState } from "react";

export default function LoadingBtn ({ onClick, children, ...rest }) {
  const [loading, setLoading] = useState(false)
  const _onClick = async (e) => {
    setLoading(true)
    const isContinue = await onClick(e)
    if (isContinue === false) return
    setLoading(false)
  }
  return <Button {...rest} loading={loading} onClick={_onClick}>{children}</Button>
}
