/**
 *
 * @param svgStr svg字符串
 */
export default function svgRender(svgStr: string) {
  const svgEleContainer = document.createElement('div');
  svgEleContainer.innerHTML = svgStr;
  return svgEleContainer;
}
