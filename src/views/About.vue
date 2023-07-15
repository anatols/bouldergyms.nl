<template>
  <div class="about">
    <h1>Strength data</h1>
    <p>
      The idea behind the strength chart is to show, for each grade, how many
      climbers can top it.
    </p>

    <p>
      The assumption is that if you can top a grade, you can also top all grades
      below it. This might not be true in each individual case, but on a large
      data set I believe is a safe assumption to make. After averaging per grade
      and adding it up I end up with exactly the data I need: the percentile of
      people who are actually able to climb that grade in that particular gym.
    </p>

    <p>
      In other words, you can read the strength chart this way:
    </p>

    <p class="thought">
      If I climb 6b at Cragdogs gym, and the chart shows 20% for 6b for
      Cragdogs, it means I am in the top 20% strongest climbers of that gym. The
      remaining 80% visitors climb below 6b.
    </p>

    <h1 class="chapter-heading">Gym grade comparison</h1>
    <p>
      An important note about the gym strength data is that it is aggregated for
      each gym separately. If you enable more than one gym in the chart, you can
      immediately see that the distribution of strength is not the same
      everywhere.
    </p>

    <p>
      The assumption I make here is that on average the climbing abilities of
      visitors are actually distributed similarly in each gym. Obviously, as
      with any assumption, this one might not be exactly matching the reality.
      But I believe that on large data sets it is valid enough to use. It’s not
      like in one particular city we suddenly have enormous amounts of strong
      vikings, do we?
    </p>

    <p>
      One note I heard a few times is that some gyms have a bunch of world-class
      athletes training there, whilst others don’t, and this should affect the
      statistics. But again, those climbers would affect statistics for higher
      sevens, and frankly, the number of them is quite limited in the big scheme
      of things (think, hundreds of thousands tops a year in the data that was
      analyzed).
    </p>

    <p>
      Ok, so with this assumption in place, it is now possible to map grades of
      one gym to grades of another.
    </p>

    <p>
      You can think of it this way:
    </p>

    <p class="thought">
      A 6b at Cragdogs gym can be climbed by 20% visitors. At Offbelay gym 20%
      of visitors can climb 5c+. So that would mean the same boulder (as in, of
      the same ‘physical hardness’) at Cragdogs will be graded 6b, but only 5c+
      at Offbelay.
    </p>

    <p>
      In most cases there is no direct correspondence, and 6a in one gym would
      fall somewhere between grades in another. And again, each climb is unique,
      and grading is not precise science. But the chart should give you a rough
      idea on which gym is ‘harder’.
    </p>

    <h1 class="chapter-heading">Grade popularity</h1>
    <p>
      Now, this one is simple: how often is each particular grade climbed. The
      difference from the strength chart is that there is no aggregation of
      lower grades.
    </p>

    <h1 class="chapter-heading">Other gyms?</h1>
    <p>
      As you might have noticed, not all gyms are on the list. Well, first, I'm
      obviously limited to gyms that are available on TopLogger. Unfortunately,
      not all gyms in the Netherlands use it.
    </p>

    <p>
      Second, I'm not including gyms that have too few tops logged, as I can't
      build meaningful stats from their data. Those are either gyms that are too
      small, or the ones that only joined TopLogger recently.
    </p>

    <h1 class="chapter-heading">Why this page</h1>
    <p>
      If you, like me, have been climbing in multiple gyms, you should have
      noticed that grading can be completely different. To an extent that you
      would be flashing mid-sixes in one, and still struggling with that pink 5b
      in another.
    </p>

    <p>
      (Obligatory: grading is subjective, each route setter has their own view
      on that, each boulder is unique, and that pink in the corner is just
      off-grade and sucks in general, blah-blah yada-yada.)
    </p>

    <p>
      Though, my idea was that if someone could gather enough statistics, all
      those unique properties of each climb can be averaged-out. You can then,
      as a climber, say something like: “statistically speaking, if I can climb
      a 6a at Het Lab, I’m strong enough to climb 6b+ at Monk”. Or, as a gym
      owner, say: “my visitors are mostly climbing 5a to 6a, maybe I should set
      more of those”.
    </p>

    <p>
      Here, <a href="https://toplogger.nu/" target="_blank">TopLogger</a> comes
      into play. They allowed me to use their historical data for all routes and
      boulders set in each gym (big thanks for that!). Along with how many
      people have climbed those.
    </p>

    <p>
      The only tiny detail left was to process that huge amount of data into
      something that’s representative. I’ve been asking around for who would do
      that, but no one volunteered, so in the end I went ahead and learned some
      Javascript and Vue, and put this page together in virtually no time.
    </p>

    <p>Hope you find it useful!</p>

    <p>Tony</p>
  </div>
</template>

<style>
.about {
  margin: auto;
  max-width: 600px;
  padding: 20px;
  font-size: 16px;
}

.thought {
  padding-left: 20px;
  border-left: 1px solid #aaa;
  font-size: 17px;
}

.chapter-heading {
  margin-top: 40px;
}
</style>
