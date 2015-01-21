# Course Structure for Jekyll
This is an example course website which uses a series of json files to populate what happens in class each week.

## Installation

- Install Jekyll: `gem install jekyll`
- [Fork this repository](https://github.com/bsalinas/FiveMoreTopics)
- Clone it: `git clone https://github.com/YOUR-USER/left`
- Run the jekyll server: `jekyll serve --port 5001 --watch --baseurl`

You should have a server up and running locally at <http://localhost:5001>.

## Data Directory
### classes.json
The classes.json file includes the names of each of the json files for the class each week. Right now it is just set to be `["week0", "week1", "week2",...]`

### weekN.json
Each week of the course has a `json` file that drives the content for that course. Here's a summary of some of the values:
* `week`: the week number
* `topic`: a key into the `_data\topics.json` object which was used to specify which topic a course was related to. This is used by the [left navigation](https://github.com/bsalinas/FiveMoreTopics/blob/gh-pages/_layouts/layout.html#L141) to indicate where we change topics (in a kind of hacky way) as well as on the title of each of the [class pages](https://github.com/bsalinas/FiveMoreTopics/blob/gh-pages/_layouts/post.html#L6).
* `description`: The description at the top of each of the pages
* `activities`: An array of the activities being covered during each individual class. See the section below on these.
* `assignments`: An array of the assignments which are assigned this week. See the section below.

#### Activities Array
The `activities` is rendered by the template at `_includes\activity.html. The idea is that each week, class time is divided into a series of `activities`.  Here's some info on the specific attributes.
* `name`:The name of the activity.
* `type`: This is not used for anything... I mainly included it so that I could later query against how many lectures versus group activities I had.
* `time`: An approximate time (in minutes). It is shown as `~N minutes` next to the name of the activity.
* `description`: The description of the activity. This can include text or html.
* `attachments`: An array of `attachment` objects. I used these to include links to slides
 * `link`: The absolute or relative path to the file. If the file begins with `http`, then it will be an absolute path. Otherwise, it will be linked relative to the root directory.
 * `title`:The name of the attachment.
 * `type`: Either `download` or `link`. This specifies whether the button says "Download {{title}}" or "View {{title}}". Initially, I was thinking there might be more kinds of attachments.
 * `location`: `internal` or not present. Not sure if this is necessary, but I used it on week1.
* `results`: An object which includes meta analysis of how the activity worked. These are toggled on or off by the checkboxes at the top of the site.
 * `summary`: Text as a summary of the student results for the activity.
 * `meta`: Used as notes to myself about the effectiveness of the activity. What would change in the future?
 * `documents`: An optional array of `documents` that show results of what happened in the class. These are rendered in the [activity template](https://github.com/bsalinas/FiveMoreTopics/blob/gh-pages/_includes/activity.html#L16). Each document has:
  * `type`: This isn't actually used. Again, the thinking was that in the future there might be other types of documents. 
	* `location`:"internal" or not present. Indicates whether this is hosted on the same server or not.
	* `caption`:Text that appears above the image.
	* `link`: The link to the attachment.

Here's an example `Activity`
```
{
	"name":"The Basics of Crafting Data Sets",
	"type":"lecture",
	"time":20,
	"description":"You don't always have access to the data you want for a design. In this lecture, we'll cover some methods for crafting datasets that are realistic.",
	"instructor_notes":"knowledge -> info -> data",
	"attachments":[
		{
			"link":"week6/crafting_data_v01.pdf",
			"title":"Slides",
			"type":"download"
		}
	],
	"results":{
		"summary":"This talk outlined some practical steps to actually generating data that isn't readily available. After a group example, students worked on generating a sample schedule as a group.",
		"documents":[
			{
				"type":"photo",
				"location":"internal",
				"caption":"These students told the story of a student who changed their major twice and studied away one semester.",
				"link":"files/week6/sample_schedule_1.jpg"
			}
		],
		"meta":"Providing the sample in lecture as well as letting students all work on the same example in their groups worked well for introducing concepts gradually."
	}
}
```

#### Assignment Array
An `assignment` object is, as it sounds, an assignment for students to work on between one class and another. These are rendered using the [`_includes\assignment.html`](https://github.com/bsalinas/FiveMoreTopics/blob/gh-pages/_includes/assignment.html) template and aggregated on the [`assignments.html`](https://github.com/bsalinas/FiveMoreTopics/blob/gh-pages/assignments.html) as well as shown at [the bottom of each class page](https://github.com/bsalinas/FiveMoreTopics/blob/gh-pages/_layouts/post.html#L42).

* `description`: This is the main field of an assignment. It includes all of the details for the assignment. It can include HTML (see [week4.json](https://github.com/bsalinas/FiveMoreTopics/blob/gh-pages/_data/week4.json#L123) as an example).
* `required`: A boolean indicating if the assingment is required or not. If it is optional, the assignment gets different text treatment and an indication that is is optional.
* `type`: A freeform field which I never did anything with. The goal was to be able to query the data later.


