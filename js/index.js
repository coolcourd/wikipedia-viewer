var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wikipedia = function (_React$Component) {
  _inherits(Wikipedia, _React$Component);

  function Wikipedia(props) {
    _classCallCheck(this, Wikipedia);

    var _this = _possibleConstructorReturn(this, (Wikipedia.__proto__ || Object.getPrototypeOf(Wikipedia)).call(this, props));

    var image = '';
    _this.handleSearch = _this.handleSearch.bind(_this);
    _this.state = {
      array: []
    };
    return _this;
  }

  _createClass(Wikipedia, [{
    key: 'handleSearch',
    value: function handleSearch(e) {
      var _this2 = this;

      e.preventDefault();
      var api = 'https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + e.target.elements.entry.value;
      fetch(api).then(function (responce) {
        return responce.json();
      }).then(function (json) {
        var key = Object.keys(json.query.pages);
        var all = key.map(function (y) {
          return json.query.pages[y];
        });
        _this2.setState({ array: all });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Wikipedia Viewer'
        ),
        React.createElement(
          'a',
          { href: 'https://en.wikipedia.org/wiki/Special:Random', target: '_blank' },
          ' Get Random '
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleSearch },
          React.createElement('input', { type: 'text', name: 'entry', placeholder: 'search', autofocus: true })
        ),
        this.state.array.map(function (x) {
          return React.createElement(Stuffs, { json: x });
        })
      );
    }
  }]);

  return Wikipedia;
}(React.Component);

var Stuffs = function Stuffs(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { id: 'card' },
      React.createElement(
        'a',
        { href: 'https://en.wikipedia.org/wiki/' + props.json.title, target: '_blank' },
        props.json.title,
        React.createElement('hr', null),
        React.createElement('img', {
          src: props.json.thumbnail != null ? props.json.thumbnail.source.replace(/50px/i, '200px') : '' }),
        React.createElement(
          'p',
          { id: 'small' },
          props.json.extract
        )
      )
    ),
    console.log(props.json)
  );
};

ReactDOM.render(React.createElement(Wikipedia, null), document.getElementById('root'));