<template>
  <div>
    <div>
      <h2>カレンダー</h2>
    </div>

    <!-- カレンダーヘッダ -->
    <div id="cal-header">
      <span class="header-arrow" @click="setLastMonth">＜</span>
      <span class="selected-month">{{ year }}年{{ month }}月</span>
      <span class="header-arrow" @click="setNextMonth">＞</span>
    </div>

    <!-- カレンダーメイン -->
    <table id="cal-main">
      <!-- 曜日を表示させる（テーブルヘッダ） -->
      <thead>
        <th v-for="(dayname, index) in weekdays" :key="index">{{ dayname }}</th>
      </thead>
      <!-- 日付を表示させる（テーブルボディ） -->
      <tbody>
        <tr v-for="(weekData, index) in calData" :key="index">
          <td
            class="cal-day"
            v-for="(dayNum, index) in weekData"
            :key="index"
            @click="dateClick(dayNum)"
            :class="{ 'cal-today': isToday(dayNum), active: day === dayNum }"
          >
            <span v-if="isToday(dayNum)">今日</span>
            <span v-else>{{ dayNum }}</span>
          </td>
        </tr>
      </tbody>
    </table>


    <hr>

    <div class="box-border2">
      <table class="box2" align="center">
        <thead>
          <tr class="box-title2">
            <th class="dataTitle">タイトル</th>
            <th class="dataTitle">カテゴリー</th>
            <th class="dataTitle">収入</th>
            <th class="dataTitle">支出</th>
            <th class="dataTitle">メモ</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(data, index) in Cdatas" :key="data.id">
            <td class="dataText">{{ data.title }}</td>
            <td class="dataText">{{ data.category }}</td>
            <td class="dataText">{{ separate(data.incomeItems) }}</td>
            <td class="dataText">{{ separate(data.outgoItems) }}</td>
            <td class="dataText">{{ data.memo }}</td>
            <th>
              <button class="trashBox" @click="deleteItem(index)">
                <img class="trashBoxImg" src="../assets/img/trashBox.png" />
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      weekdays: ["日", "月", "火", "水", "木", "金", "土"],
      year: 2020,
      month: 3,
      day: -1,
      today: "",

      Cdatas: [],
      CCC:[],
    };
  },
  mounted() {
    var date = new Date();
    var y = date.getFullYear();
    var m = ("0" + (date.getMonth() + 1)).slice(-2);
    console.log(m);
    var d = ("0" + date.getDate()).slice(-2);
    console.log(d);

    // yearとmonthを設定
    this.year = y;
    this.month = Number(m);
    console.log(this.month);
    // 今日の日付を設定
    this.today = y + "-" + m + "-" + d;
    console.log(this.today);
  },



  methods: {
    ...mapState (["datas"]),
    ...mapActions (["deleteAction",]),

    separate(num) {
      return num !== null
        ? num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
        : null;
    },
    /**
     * カレンダー日付クリック時の処理
     */
    dateClick(dayNum) {
      if (dayNum !== "") {
        this.day = dayNum;
        dayNum = ('0' + dayNum).slice(-2);
      }
      console.log(dayNum);
      console.log(this.month);

      let Cdata = `${dayNum}のデータだよ`;
      console.log(Cdata);
      this.Cdatas = Cdata;

      if (this.year + "-" + this.month + "-" + this.day == "2021-10-07") {
        this.Cdatas = "7日目の情報です！";
      }

      if (this.year + "-" + this.month + "-" + this.day == "2021-10-23") {
        this.Cdatas = "誕生日です！";
      }

      let fD = [];
      this.day = dayNum;
      dayNum = ('0' + dayNum).slice(-2);
      this.month = ('0' + this.month).slice(-2);
      console.log(this.month);

      let fullData = this.$store.state.datas.map ((item) => item.date )
      console.log(fullData);
      console.log (this.year + "-" + this.month + "-" + this.day)
      console.log(this.$store.state.datas);       

      for ( let i = 0; i < fullData.length; i++ ) {
          console.log(fullData[i]);
          console.log (this.year + "-" + this.month + "-" + this.day)
        //   let after = this.$store.state.datas.filter ()
          let after = this.$store.state.datas.filter ( data => {
              return ( data.date == fullData[i] )
          });
          console.log(after);
          

        //   this.CCC = after;
        //   console.log(this.CCC);

        if (this.year + "-" + this.month + "-" + this.day == fullData[i]) {
            //   let afterOb = after.find ( item => item.date === fullData[i] )
            //   console.log ( afterOb );
              fD = after
            //   fD.concat (after)
              console.log(fD);
              for ( let j = 0; j < fD.length; j++ ) {
              console.log(fD[j].date);
              console.log(fD[j].title);
              console.log(fD[j].category);
              console.log(fD[j].incomeItems);
              console.log(fD[j].outgoItems);
              console.log(fD[j].memo);
              this.Cdatas = fD
            
              console.log(this.Cdatas);
              }
        } else {
            this.Cdatas = fD
        }
    }
        console.log(this.Cdatas);
      
    },
    /**
     * 今日かどうかの判定
     * 年、月は現在選択しているページ
     * 日は引数
     */
    isToday(day) {
      var date = this.year + "-" + ("0" + this.month).slice(-2) + "-" + day;
      if (this.today === date) {
        return true;
      }
      return false;
    },
    /**
     * 先月のカレンダーを取得
     */
    setLastMonth() {
      if (this.month === 1) {
        this.year--;
        this.month = 12;
      } else {
        this.month--;
      }
      this.day = -1;
    },
    /**
     * 翌月のカレンダーを取得
     */
    setNextMonth() {
      if (this.month === 12) {
        this.year++;
        this.month = 1;
      } else {
        this.month++;
      }
      this.day = -1;
    },

    deleteItem(index) {
      if (confirm("消去しますか？")) {
        this.deleteAction(index);
        this.$router.push({ name: "Home" }, () => {});
      }
    },
  },


  computed: {
    calData() {
      console.log(this.year + "-" + this.month + "のデータ作成");
      var calData = [];
      // 初日の曜日を取得
      var firstWeekDay = new Date(this.year, this.month - 1, 1).getDay();
      // 月の日数
      var lastDay = new Date(this.year, this.month, 0).getDate();
      // 日数カウント用
      var dayNum = 1;
      // 週ごとのデータを作成して、calDateにpush
      while (dayNum <= lastDay) {
        var weekData = [];

        // 日曜～土曜の日付データを配列で作成
        for (var i = 0; i <= 6; i++) {
          if (calData.length === 0 && i < firstWeekDay) {
            // 初週の1日以前の曜日は空文字
            weekData[i] = "";
          } else if (lastDay < dayNum) {
            // 最終日以降の曜日は空文字
            weekData[i] = "";
          } else {
            // 通常の日付入力
            weekData[i] = dayNum;
            dayNum++;
          }
        }
        calData.push(weekData);
      }
      return calData;
    },
  },
};
</script>
<style scoped>
/*---------------------------------------
ヘッダのcss
---------------------------------------*/
#cal-header {
  font-size: 24px;
  padding: 0;
  text-align: center;
  margin-bottom: 10px;
  background-color: rgb(243, 182, 107);
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
#cal-header span {
  padding: 15px 20px;
  color: white;
  display: inline-block;
  font-weight: bold;
}

.header-arrow {
  cursor: pointer;
}
/*---------------------------------------
カレンダーのcss
---------------------------------------*/
#cal-main {
  font-size: 14px;
  line-height: 20px;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-bottom: 1px solid #ddd;
  border-collapse: collapse;
  background-color: white;
}
#cal-main th {
  padding: 0;
  text-align: center;
  vertical-align: middle;
  font-weight: normal;
  color: #999;
  background-color: white;
}
#cal-main td {
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid #ddd;
  background-color: white;
}
.cal-today {
  background-color: #fcf8e3;
  background-color: white;
}
.cal-day {
    cursor: pointer;
    background-color: white;
}
.cal-day.active {
  background-color: #ffc9d7;
  background-color: white;

}

/*---------------------------------------
カレンダー情報のcss
---------------------------------------*/

.box-border2 {
  text-align: center;
  position: relative;
  margin: 3em 0 1em 0;
  background: #fff6e6;
  box-shadow: 0 2px 3px rgba(0,0,0,.22);
  padding: 22px 8px 22px 8px;
  background-color: #fff6e6;
  /* background-image:
  linear-gradient(90deg, rgba(237, 119, 128, 0) 0%, rgba(237, 119, 128, 0) 50%, #fff6e6 0%, #fff6e6 100%), linear-gradient(180deg, rgba(237, 119, 128, 0) 0%, rgba(237, 119, 128, 0) 95%, #ed7780 100%); */
  background-size: 8px 100%,100% 2em;
  line-height: 2;
  color: #ee8992;
  font-weight: bold;
  width: 100%;
}
.box2 {
    width: 100%;
  background: #fff6e6;
  font-size: 1.2em;
  padding: 7px 0 0 16px;
  margin-top: 5%;
  color: #ee8992;
  font-weight:bold;

}
.box-border2:after {
  position: absolute;
  content: "";
  top: 25px;
  width: 30%;
  height: 35px;
  opacity: 0.7;
  margin: -35px auto 10px 35%;
  background-color: #ffd699; /* 背景色 */
  background-image: radial-gradient(#fff 24%, transparent 0), radial-gradient(#fff 24%, transparent 0);
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
  transform: rotate(-2deg);
  left: 10px;
  right: 10px;
  box-shadow:0 0 5px rgba(0,0,0,.2);
}
.box-border2 p {
  margin: 0;
  padding: 0;
}
.dataText {
    font-size: 16px;
    color: #605953;
}
.dataTitle {
    /* background-color: #ee8992; */
    color: #ffd079;
    border-bottom: 3px dashed #ffd079; /* 下側の1本線 */
    font-size: 18px;
    font-weight: 900;
    /* padding: 5px ; */
    /* margin-left: auto;
    margin-right: auto; */
    text-align: center;
    /* border-radius: 20px; */

}
</style>