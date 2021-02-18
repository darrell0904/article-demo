import React, { useEffect } from 'react';
import styles from './index.css';

const Demo2 = (): JSX.Element => {
  return (
    <div className={styles.normal}>
      <h1>我是 sticky 的第一个 demo</h1>
      <nav>
        <h3>导航A</h3>
        <h3>导航B</h3>
        <h3>导航C</h3>
      </nav>
      <article>
        <p>position:sticky早有耳闻也有所了解，后来，Chrome放弃了对其支持，我也就不关心这个声明了，<br />今天偶然发现，卧槽，Chrome什么时候杀了个回马枪，居然又支持了。眼瞅着，各个浏览器纷纷立了山头，要必要关心关心position:sticky了，不要被人留下厚此薄彼的口舌。</p>
        <p>单词sticky的中文意思是“粘性的”，position:sticky表现也符合这个粘性的表现。基本上，<br />可以看出是position:relative和position:fixed的结合体——当元素在屏幕内，表现为relative，就要滚出显示器屏幕的时候，表现为fixed。例如，可以滚动下面这个框框感受下交互表现：</p>
        <p>很多人以为position:sticky就上面这点效果，就好像以为就是个平常的史莱姆一样，实际上，<br />position:sticky可以实现性价比极高，甚至还有点小酷的交互布局效果。嘿嘿，这可是皇帝的夜壶——不是人人都能看到的哟。</p>
        <p>position:sticky有个非常重要的特性，那就是sticky元素效果完全受制于父级元素们。<br />这和position:fixed定位有着根本性的不同，fixed元素直抵页面根元素，其他父元素对其left/top定位无法限制。</p>
        <p>父级元素不能有任何overflow:visible以外的overflow设置，否则没有粘滞效果。<br />因为改变了滚动容器（即使没有出现滚动条）。因此，如果你的position:sticky无效，看看是不是某一个祖先元素设置了overflow:hidden，移除之即可。</p>
        <p>父级元素设置和粘性定位元素等高的固定的height高度值，或者高度计算值和粘性定位元素高度一样，<br />也没有粘滞效果。我专门写了篇文章深入讲解了粘性效果无效的原因，可以点击这里查看。</p>
        <p>同一个父容器中的sticky元素，如果定位值相等，则会重叠；如果属于不同父元素，<br />且这些父元素正好紧密相连，则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。至于原因需要理解粘性定位的计算规则，同样点击这里查看。</p>
        <p>sticky定位，不仅可以设置top，基于滚动容器上边缘定位；还可以设置bottom，<br />也就是相对底部粘滞。如果是水平滚动，也可以设置left和right值。</p>
      </article>
    </div>
  );
}

export default Demo2;
