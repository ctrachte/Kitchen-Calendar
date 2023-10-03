# Kitchen-Calendar
Open source, vanilla JavaScript calendar API with options to customize and tailor to any use case or framework

## Project Goals:
Currently all goals and progress tracking will be done through the github [issues](https://github.com/ctrachte/Kitchen-Calendar/issues) feature. Checkout the [project board](https://github.com/users/ctrachte/projects/2) as well for detailed progress updates.

<!-- DEPENDENCIES -->
## Dependencies:
- The goal of this project is to have only one dependency for date/time conversions
- The project needs to be as lightweight as possible, we have chosen to rely on [dayjs](day.js.org)
- If you are contributing, please do not introduce any additional dependencies.

<!-- GETTING STARTED -->
## Getting Started

### Using Git, and Vanilla JS
1. Clone the repo
```
git clone https://github.com/ctrachte/KitchenCalendar.js
```
2. Using VSCode's live server, open `index.html` in your browser of choice to view and test behavior.
3. Adjust the options as necessary for your needs, be sure to supply the KitchenCalendar options with the appropriate container HTML element node.

### Using NPM (React, Next.js) *This will be available once the first version is published to NPM*
1. Install the npm package:
```
npm i --save KitchenCalendar
```
4. Import the KitchenCalendar, and move/scope the KitchenCalendarSmall.css and moment.js files in the appropriate places in your project.

5. Adjust the options as necessary for your needs, be sure to supply the KitchenCalendar options with the appropriate container HTML element node. *See usage section below*

<!-- USAGE EXAMPLES -->
## Usage

1.) You will first need a recent version of day.js installed. 
 - You can use the one included in the helpers folder of this project *  _*RECOMMENDED*_ *

2.) Download and add the KitchenCalendar.js and KitchenCalendar.css files to their appropriate directories in your project.
 - you will need to reference them in your project in a way that they are in scope to the code you are initializing the KitchenCalendar with.  

3.) Adjust the options above to meet the needs of your project, or the project's component you are implementing the KitchenCalendar in. 

<!-- CONTRIBUTING -->
## Contributing (for Hacktoberfest 2023)!

Contributions are **greatly appreciated** towards the final goal of a perfect Calendar API!

[Please visit this contribution guide for GitHub open source if you are unsure about any of these steps:](https://gist.github.com/Chaser324/ce0505fbed06b947d962)

[More tips on how to write the perfect pull request.](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/)

1. Fork the Project (top right there should be a button)
2. Look through the [issues](https://github.com/ctrachte/Kitchen-Calendar/issues), and choose one that is not in progress on the [project board](https://github.com/users/ctrachte/projects/2)
3. Comment on the issue and I will assign it to you.
4. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
5. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the Branch (`git push origin feature/AmazingFeature`)
7. Please track your progress on the [project board](https://github.com/users/ctrachte/projects/2)
8. Open a Pull Request 

*Code will be reviewed before being merged. If your code does not quite work or needs revision it may not be merged to the master. Any pull requests that contain spam or go against [Hacktoberfest's rules of participation](https://hacktoberfest.com/participation/) will not be accepted/merged*


<!-- LICENSE -->
## License

Distributed under the MIT License. 
