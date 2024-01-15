/**
 * 合并多个样式类名
 * @param args
 */
export function classNames(...args: string[]) {
  return args.filter((item) => item).join(' ');
}
