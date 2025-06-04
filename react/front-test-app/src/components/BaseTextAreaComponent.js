
import React, { Component, createRef } from "react";


class BaseTextArea extends Component {
  render() {
    const { className, ...rest } = this.props;
    return <textarea placeholder="단어를 입력하세요.(띄어쓰기 혹은 줄바꿈으로 구분합니다.)"ref={this.props.forwardedRef} {...rest} />;
  }
}

const ForwardedBaseTextArea = React.forwardRef((props, ref) => {
  return <BaseTextArea {...props} forwardedRef={ref} />;
});

class Editor extends Component {
  constructor(props) {
    super(props);
    this.textAreaRef = createRef();
  }

  clearText = () => {
    if (this.textAreaRef.current) {
      this.textAreaRef.current.value = "";
    }
  };

  countAnagrams = () => {
    if (!this.textAreaRef.current) return;

    const text = this.textAreaRef.current.value.trim();

    if (!text) {
      alert("입력된 텍스트가 없습니다.");
      return;
    }

    const words = text.split(/\s+/);
    const sortedWords = words.map((w) =>
      w.toLowerCase().split("").sort().join("")
    );

    let count = 0;

    const map = {};

    sortedWords.forEach((sw) => {
      if (map[sw]) {
        map[sw] += 1;
      } else {
        map[sw] = 1;
      }

    });

    // 애너그램 쌍은 2개 이상인 그룹에서 조합으로 계산 (nC2)
    Object.values(map).forEach((freq) => {
      if (freq > 1) {
        count += (freq * (freq - 1)) / 2;
      }
    });

    alert(`애너그램 쌍의 개수: ${count}`);
  };

  render() {

    return (
      <div>
        <div className="box">
          <div>
            <h3>애너그램 판별기</h3>
          </div>
          <ForwardedBaseTextArea ref={this.textAreaRef} rows={10} cols={25} />
          <br />
          <br />
          <button onClick={this.clearText}>버튼 1 :입력 값 삭제</button><br /><br />
          <button onClick={this.countAnagrams}>버튼 2 : 애너그램 개수 확인</button>
        </div>
      </div>
    );
  }

}

export default Editor;
