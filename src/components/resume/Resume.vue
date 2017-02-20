<template>
  <section class="page">

    <!--左边栏-->
    <div class="left">

      <section id="header">
        <div class="avatar"></div>
        <!--<div class="job">{{job}}</div>-->
        <div class="name">{{resume.name}}</div>
      </section>

      <h2 class="h-white">个人信息</h2>
      <section id="baseInfo">
        <div class="age">年龄：{{resume.baseInfo.age}}</div>
        <div class="phone">电话：{{resume.baseInfo.phone}}</div>
        <div class="email">邮箱：{{resume.baseInfo.email}}</div>
        <div class="school">学校：{{resume.baseInfo.school}}</div>
        <div class="major">专业：{{resume.baseInfo.major}}</div>
        <div class="graduateDate">毕业年份：{{resume.baseInfo.graduateDate}}</div>
        <div class="blogAddress">个人博客：<a :href="resume.baseInfo.blogAddress">{{resume.baseInfo.blogAddress}}</a></div>
      </section>

      <h2 class="h-white">职业技能</h2>
      <section id="vocationalSkill">
        <!--skill item 使用v-for循环-->
        <div class="skill-item" v-for="skill in resume.vocationalSkills">
          <div class="name">{{skill.name}}</div>
          <mu-linear-progress class="progress" mode="determinate" :value="skill.score" color="#ec407a"/>
        </div>
      </section>

    </div>

    <!--右边栏-->
    <div class="right">

      <h2 class="h-blue">工作经验</h2>
      <section class="works">
        <div class="work-item" v-for="workExperience in resume.workExperiences">
          <div class="work-title">
            <div>{{workExperience.company}} | {{workExperience.job}} | {{workExperience.city}}</div>
            <div>{{workExperience.beginTime}} - {{workExperience.endTime}}</div>
          </div>
        </div>
      </section>
    </div>

  </section>
</template>

<script>
  export default {
    data () {
      return {
        resume: {
          job: '前端开发工程师',
          name: '王 凯',
          // 基本信息
          baseInfo: {
            age: '24',
            phone: '15652912603',
            email: 'waka931124@gmail.com',
            school: '华北电力大学(北京)',
            major: '软件工程',
            graduateDate: '2016年6月',
            blogAddress: 'http://www.badwaka.cn'
          },
          // 工作经验
          workExperiences: [{
            company: '正益移动互联科技股份有限公司',
            job: '前端开发工程师',
            city: '北京',
            beginTime: '2015.10',
            endTime: '至今'
          }],
          // 职业技能
          vocationalSkills: [{
            name: 'HTML',
            score: 90
          }, {
            name: 'CSS',
            score: 80
          }, {
            name: 'JavaScript',
            score: 75
          }, {
            name: 'ES6/7',
            score: 30
          }, {
            name: 'jQuery',
            score: 70
          }, {
            name: 'Bootstrap',
            score: 30
          }, {
            name: 'Backbone',
            score: 30
          }, {
            name: 'Vue/Vue2',
            score: 70
          }, {
            name: 'React',
            score: 40
          }, {
            name: 'Angular2',
            score: 10
          }, {
            name: '微信小程序',
            score: 70
          }, {
            name: 'AppCan.js',
            score: 80
          }, {
            name: 'Node.js',
            score: 60
          }, {
            name: 'Express',
            score: 40
          }, {
            name: 'Koa/Koa2',
            score: 30
          }, {
            name: 'webpack',
            score: 30
          }, {
            name: 'Gulp.js',
            score: 20
          }, {
            name: 'MongoDB',
            score: 30
          }, {
            name: 'Java',
            score: 40
          }, {
            name: 'Android SDK',
            score: 50
          }, {
            name: 'Git/Svn',
            score: 60
          }, {
            name: 'Linux',
            score: 40
          }, {
            name: 'macOS',
            score: 80
          }]
        }
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  @import "../../common/css/color.scss";

  .h-white {
    width: 100%;
    font-size: 24px;
    padding-bottom: 8px;
    margin-bottom: 8px;
    margin-top: 36px;
    border-bottom: 1px solid #fff;
  }

  .h-blue {
    color: $color-primary;
    width: 100%;
    font-size: 24px;
    padding-bottom: 8px;
    margin-bottom: 8px;
    margin-top: 36px;
    border-bottom: 1px solid $color-primary;
  }

  a {
    color: $pink400;
  }

  .page {
    display: flex;
  }

  .left {
    padding: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $color-primary;
    color: #fff;

    #header {
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        margin-top: 36px;
        height: 150px;
        width: 150px;
        background: url(http://img.hb.aicdn.com/19dd42725e125bb7424785afbddeee41d5eb13931b097-evWO7z_fw658) center no-repeat;
        background-size: cover;
        border-radius: 50%;
        box-shadow: 5px 10px 10px $blue500;
      }

      .job {
        margin-top: 36px;
        font-size: 32px;
      }

      .name {
        margin-top: 18px;
        font-size: 32px;
      }
    }

    #baseInfo {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 18px;
    }

    #vocationalSkill {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 14px;

      .skill-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;

        .progress {
          margin-left: 24px;
          width: 200px;
        }
      }
    }
  }

  .right {
    width: 60%;
    padding: 0 36px;

    .works {
      .work-item {
        .work-title {
          display: flex;
          justify-content: space-between;
        }
      }
    }

  }
</style>
