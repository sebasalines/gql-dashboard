export default function ip2long (ip) {
  const bytes = ip.split('.').map(Number)
  let val = 0;
  val |= bytes[0] << 24;
  val |= bytes[1] << 16;
  val |= bytes[2] << 8;
  val |= bytes[3];
  return val >>> 0;
}
