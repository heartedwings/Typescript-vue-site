<template>
  <div class="form">
    <h1>追加ページ</h1>

    <div>
      <div>
        日付
        <div><input name="date" type="date" v-model="data.date" /></div>
      </div>

      <div>
        <!-- <validation-observer> -->
        タイトル
        <!-- <validation-provider name="タイトル" rules="required"> -->
        <div>
          <input type="text" v-model="data.title" />
          <!-- <p class="error">{{ ProviderProps.errors[0] }}</p> -->
        </div>
        <!-- </validation-provider>
        </validation-observer> -->
      </div>

      <div>
        収入 <input type="radio" name="money" id="income" value="amountI" v-model="data.amountI" @click="onChangeInout()"/>
        支出 <input type="radio" name="money" id="outgo" value="amountO" v-model="data.amountO" @click="onChangeInout()" />
      </div>

      <div>
        カテリゴリ
        <div>
          <select name="category" id="category" v-model="data.category">
            <option value="" disabled selected>
              ...Please select a category
            </option>
            <option value="お給料">お給料</option>
            <option value="食料">食料</option>
            <option value="家電製品">家電製品</option>
            <option value="粧工品">粧工品</option>
            <option value="生活雑貨">生活雑貨</option>
            <option value="書籍">書籍</option>
            <option value="その他">その他</option>
          </select>
        </div>
      </div>

      <div>
        金額
        <div>
          <input type="text" v-model="data.amount" @change="onChangeInout()" />
        </div>
      </div>

      <div>
        メモ
        <div>
          <textarea
            cols="30"
            rows="5"
            maxlength="100"
            placeholder="100文字以内"
            v-model="data.memo"
          />
        </div>
      </div>
    </div>

    <div class="Validation" v-for="text in Validation" :key="text">{{text}}</div>

    <div>
      <button @click="addData()">投稿</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import Vue from 'vue';
// import VeeValidate from 'vee-validate';

// // 使用する機能
// import {
//   ValidationObserver,
//   ValidationProvider,
//   extend
// } from "vue-validate";

// Vue.component('ValidationProvider', ValidationProvider);
// Vue.component('ValidationObserver', ValidationObserver);

// // エラーメッセージの日本語化用
// import ja from "vee-validate/dist/locale/ja.json"

// 使用するvalidate rule
// import { required, max, email, numeric, regex } from "vee-validate/dist/rules"

// extend("required", required)
// extend("email", email)
// extend("max", max)
// extend("numeric", numeric)
// extend("regex", regex)

// extend("select_required", { // ルールの名前
//   ...required, // 追加する検証ルールの種類
//   message: "{_field_}を選択してね", // 表示するメッセージ
// });

export default {
  data() {
    return {
      data: {
        date:"",
        title: "",
        category: "",

        amountI: 0,
        amountO: 0,
        /** 収支 'income' or 'outgo' */
        inout: "",
        amount: 0,
        memo: "",

        incomeItems: 0,
        outgoItems: 0,
        /** 選択カテゴリ一覧 */
        categoryItems: [],

        tMoney:0,
      },
      Validation:[]
    };
  },

  methods: {
    addData() {
      console.log("投稿しました！");
      console.log(this.data);
      console.log(this.data.amount);

      console.dir(this)

      //半角数字のみのバリデーション
      let Vnum = new RegExp (/^[0-9]+$/)


      this.Validation = [];
      if ( this.data.date == "" ) {
        this.Validation.push("日付を入力して下さい")
      }
      if ( this.data.title== "" ) {
        this.Validation.push("タイトルを入力して下さい")
      }
      if ( this.data.amountI == "" && this.data.amountO == "" ) {
        this.Validation.push("『 収入 』か『 支出 』か入力して下さい")
      }
      if ( this.data.category == "" ) {
        this.Validation.push("項目を入力して下さい")
      }
      if ( this.data.amount == "" ) {
        this.Validation.push("金額を入力して下さい")
      } else if (!Vnum.test(this.data.amount)) {
        this.Validation.push("半角数字で入力して下さい")
      }

      
      if (this.Validation.length == 0) {
        this.addAction(this.data);
        this.$router.push({ name: "Home" }, () => {});
      }
    },


    onChangeInout () {
      let m = 0;
      let totalamount = document.getElementsByName("money"); //チェック済みのラジオボタンを調べて値を取得

      for ( let i = 0; i < totalamount.length; i++ ) {
        if ( totalamount[i].checked ) {
          m = totalamount[i].value ;
          console.log(m);

          if ( m == "amountI" ) {
            console.log(this.data.amount);
            let I = this.data.amount;
            console.log (I);
            this.data.incomeItems = I
            console.log(this.data.incomeItems);

          } else if ( m == "amountO" ) {
            let O = this.data.amount;
            console.log (O);
            this.data.outgoItems = O
            console.log(this.data.outgoItems);
            
          }
        }

        // //収入を足す
        // let addIncome = function(account, amountI){
        //   account.amountI = account.amountI + amountI
        //   console.log(account.amountI);
        // }

        // // 費用を引き
        // let addExpenses = function(account, amountO){
        //   account.amountO = account.amountO + amountO
        //   console.log(account.amountO);
        // }

        // //費用をリセットする
        // let resetAccount = function(account){
        //   account.amountI = 0,
        //   account.amountO = 0
        //   console.log(resetAccount);
        // }

        // let getAccountSummary = function(account){
        //   let balance = account.income - account.expenses;
        //   return `このアカウントは${account.name}の物で、残金は${balance}です。収入は${account.amountI}、支出は${account.amountO}です` 
        // }
        // console.log(getAccountSummary);



        let addIncome = amountI => {
          d.amountI = amountI + amountI
          console.log(d.amountI)
        }
        let totalMoney = this.data.incomeItems - this.data.outgoItems
        console.log(totalMoney);
        this.data.tMoney = totalMoney;
        console.log(this.data.tMoney);

      }


    },

    ...mapActions(["addAction", "addMoney"]),
  },

};
</script>

<style>
.Validation{
  color: rgb(222, 68, 68);
}
</style>