<template>
  <div class="back">
    <div class="back2">
    <div>
      <button @click="login">google ログイン！</button>
    </div>

    <div v-if="$store.state.login_user">
      <button @click="logout">ログアウト！</button>
    </div>

    <hr />

    <div>
      <h2>KAKE-BO</h2>
    </div>

    <div>
      <h5>最終更新日</h5>
    </div>

    <div>
      <h6>{{ getNow() }}</h6>
    </div>

    <div class="calender">
      <Calender />
    </div>

    <div class="add-p">
      <button class="add" @click="addItem">＋</button>
    </div>

    <div class="search">
      <label class="s">
        <input type="text" v-model="searchWord" name="search" placeholder="日付検索..." />
        &nbsp;&nbsp;<button class="s-button" @click="search">🔍</button>
        &nbsp;&nbsp;<button class="s-button" @click="clear">🗑</button>
      </label>
    </div>
    
    <!-- <div>
      <p>件数:{{searchW.length}}件</p>　// 結果件数の表示
    </div>
 -->
    <!-- <div v-for="word in searchW" :key="word.id">
      {{ word }}
    </div> -->

    <!-- <div v-if="data in $store.state.datas" :key="data.id">
    差額 : {{ data.tMoney }}
  </div> -->

  <!-- <div id="pagination">
    <ul class="pagination">
        <li @click="showFirst" class="{{isStartPage ? 'disabled' : ''}}"><a>&laquo;</a></li>
        <li @click="showPrev" class="{{isStartPage ? 'disabled' : ''}}"><a>&lt;</a></li>
        <li @click="showPage($index)" class="{{page == $index ? 'active': ''}}" v-repeat="pageCount"><a>{{$index + 1}}</a></li>
        <li @click="showNext" class="{{isEndPage ? 'disabled' : ''}}"><a>&gt;</a></li>
        <li @click="showLast" class="{{isEndPage ? 'disabled' : ''}}"><a>&raquo;</a></li>
    </ul>
    </div> -->
    <div class="box-border">
      <table class="box" align="center">
        <thead>
          <tr class="box-title">
            <th>日付
              <span @click="sortD">▼</span>
              <span @click="sortA">▲</span>
            </th>
            <th>タイトル</th>
            <th>カテリゴリ</th>
            <th>収入</th>
            <th>支出</th>
            <th>メモ</th>
            <th>-</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(data, index) in $store.state.datas" :key="data.id">
            <th>{{ data.date }}</th>
            <th>{{ data.title }}</th>
            <th>{{ data.category }}</th>
            <th>{{ separate(data.incomeItems) }}</th>
            <th>{{ separate(data.outgoItems) }}</th>
            <th>{{ data.memo }}</th>
            <th>
              <button class="trashBox" @click="deleteItem(index)">
                <img class="trashBoxImg" src="../assets/img/trashBox.png" />
              </button>
            </th>
          </tr>
        </tbody>
      </table>
      
    </div>

    <div>
      <button @click="test">総収入計算</button>
      <div>
        <div>Total income : {{ this.totalI }} yen</div>
        <div>Total outgo : {{ this.totalO }} yen</div>
        <div>Difference : {{ this.total }} yen</div>
      </div>
    </div>

    <div>
      <Graph />
    </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "firebase";
import Graph from "../components/Graph.vue";
import Calender from "../components/Calender.vue";
// import { Pie } from 'vue-chartjs'


export default {
  // extends: Pie,
  components: {
    Graph,
    Calender,
  },

  data() {
    return {
      totalI: 0,
      totalO: 0,
      total: 0,

      sW: '',
      searchWord: '',
      list: []

    };
  },

  mounted() {
    this.renderChart(this.chartdata["datacollection"], this.options);
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
      } else {
        this.deleteLoginUser();
      }
    });
  },

  methods: {
    ...mapActions([
      "login",
      "logout",
      "setLoginUser",
      "deleteLoginUser",
      "deleteAction",
    ]),
    ...mapState(["datas"]),

    getNow() {
      var now = new Date();
      var year = now.getFullYear();
      var mon = now.getMonth() + 1; //１を足すこと
      var day = now.getDate();
      var hour = now.getHours();
      var min = now.getMinutes();
      var sec = now.getSeconds();
      var todayNow =
        year +
        "年" +
        mon +
        "月" +
        day +
        "日" +
        hour +
        "時" +
        min +
        "分" +
        sec +
        "秒";
      return todayNow;
    },

    /**
     * 数字を3桁区切りにして返します。
     * 受け取った数が null のときは null を返します。
     */
    separate(num) {
      return num !== null
        ? num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
        : null;
    },

    addItem() {
      this.$router.push({ name: "Form" }, () => {});
    },

    deleteItem(index) {
      if (confirm("消去しますか？")) {
        this.deleteAction(index);
      }
    },

    test() {
      // const result = array.reduce((前回の値, 現在の値, 現在currentとして処理されている要素のインデックス, reduceによって操作されている配列自身) => {
      //   return 次の値;
      // }, 初期値);

      const nums = [1, 2, 3, 4, 5];

      // 初期値あり
      const result1 = nums.reduce((prev, current, index, array) => {
        console.log(prev, current, index, array);
        return prev + current;
      }, 0);
      console.log(result1); // 15

      console.log("aaaaa");
      console.log(this.$store.state);
      console.log(this.$store.state.datas);

      //収入合計
      let amoI = this.$store.state.datas.reduce(
        (prev, current, index, array) => {
          console.log((prev, current, index, array));
          return prev + current.incomeItems * 1;
        },
        0
      );
      console.log(amoI);

      //支出合計
      let amoO = this.$store.state.datas.reduce(
        (prev, current, index, array) => {
          console.log((prev, current, index, array));
          return prev + current.outgoItems * 1;
        },
        0
      );
      console.log(amoO);

      //差額
      let amoT = amoI - amoO;
      console.log(amoT);
      this.total = amoT;

      this.totalI = amoI;
      this.totalO = amoO;
    },

    sortD () {
      let daySort = this.$store.state.datas.sort (function(a, b) {
        return ( a.date > b.date ) ? -1 : 1; //オブジェクトの降順ソート
      })
      console.log(daySort);
    },
    sortA () {
      let daySort = this.$store.state.datas.sort (function(a, b) {
        return ( a.date < b.date ) ? -1 : 1; //オブジェクトの降順ソート
      })
      console.log(daySort);
    },

    search() {
      this.sW = this.serchWord
    },

    clear() {
      this.searchWord = '';
    },

  },


  computed: {
    searchW() {
      return this.$store.state.datas.filter ( word => {
          return word.indexOf (this.searchWord) > -1
        })
      }
  }
};
</script>

<style>
.add-p {
  margin-bottom: 10%;
  margin-left: 70%;
}
.add {
  /* border: none; */
  border-radius: 50%;
  background-color: cadetblue;
  font-size: 100%;
  color: aliceblue;
  cursor: pointer;
}
.add:hover {
  border: 1px rgb(202, 209, 216);
}

.search {
  position: relative;
  width: 60%;
  margin-bottom: 3%;
  margin-left: auto;
  margin-right: auto;
}

.search input[type="text"] {
  font: 15px/24px sans-serif;
  box-sizing: border-box;
  width: 70%;
  padding: 0.3em;
  transition: 0.3s;
  letter-spacing: 1px;
  border: 1px solid #1b2538;
  border-radius: 4px;
}

.s input[type="text"]:focus {
  border: 1px solid #6179e5;
  outline: none;
  box-shadow: 0 0 5px 1px rgba(63, 60, 218, 0.5);
}

.s-button {
  cursor: pointer;
}

.box {
  margin: 2em 0;
  background: #fff3c7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22);
  margin-left: auto;
  margin-right: auto;
}
.box .box-title {
  font-size: 1.2em;
  background: #ffdc8a;
  padding: 4px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  letter-spacing: 0.05em;
}
.box30 th {
  padding: 15px 20px;
  margin: 0;
}

.trashBox {
  border: none; /* 枠線を消す */
  outline: none; /* クリックしたときに表示される枠線を消す */
  background: transparent; /* 背景の灰色を消す */
  cursor: pointer;
}
.trashBoxImg {
  width: 50%;
}

.calender {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}


.dataText {

}

.back {
	background-color: rgba(250,250,250,1);
	background-image:
	 radial-gradient(closest-side,
		 transparent 99.9%, rgba(255, 226, 180, 0.245) 100%),
	 radial-gradient(closest-side,
		 transparent 99.9%, rgba(255, 226, 180, 0.245) 100%);
	background-position: 0 0, 30px 30px;
	background-size: 60px 60px;
}
/* .back2 {
  background-color: white;
}
 */
</style>

