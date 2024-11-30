# 19 Oct 2024 Notes

Status: grapevine-brainstorm, interpretation-brainstorm, and interpretation-brainstorm all are functioning on Vercel deployments. However, the calculation engine is unable to scale up sufficiently. Probably could handle a Grapevine WoT Network of 20k - 50k, but there are currently over 200k, and growing.

Pain point: need to scale up CPU and memory to handle 200k+ nostr users. Vercel probably not ideal for scaling.

Plan: switch the two API modules from Vercel to Amazon AWS EC2 which is better suited for scalability. For the front end module, could do either ercel or Amazon. Both are working easily. Probably will do Amazon for consistency, although CICD pipeline is not yet set up.

Other options: EC2 versus ECS: unclear which would be ideal, but EC2 is likely sufficient plus easier for me to get back up to speed. Amazon lambda may be useful for intensive GrapeRank calculations for future scaling.

## Progress

1. Able to clone grapevine-brainstorm to EC2 and have it work out of the box by following this tutorial: https://medium.com/@rizkiprass/step-by-step-guide-deploying-a-react-app-on-aws-ec2-b2965af05aa4 . Nostr login works, pulling information from API (still hosted on Vercel) works. However, CI/CD pipeline is not yet set up. For now, I will keep front end on Vercel (grapevine-brainstorm).

2. Able to deploy a boilerplate next.js app following this tutorial: https://medium.com/@mudasirhaji/deploying-a-next-js-app-manually-on-aws-ec2-a-step-by-step-guide-58b266ff1c52 pretty easily. But have not yet established CI/CD pipeline.

## Next steps

1. Figure out the CICD pipeline to maintain calculation and interpretation engines on github and deploy them to EC2. Search keysords: GitHub, CI/CD, Amazon AWS EC2, Next.js, API. Options: GitHub Actions, amazon CodeDeployment, maybe both in conjunction.

Candidate tutorials:
- not this one https://wesleybaxterhuber.medium.com/creating-a-ci-cd-pipeline-using-github-and-aws-ec2-f1f9a94bf4e2 : not next.js specific 
- candidate: https://www.abcsoftwarecompany.com/showcases/deploy-web-application-with-git-hub-actions-ci-cd-and-amazon-web-service-ec-2 -- probably the best bc it uses familiar products: github, github actions, next.js, pm2, EC2 -- new thing: github runners 
- candidate: https://www.linkedin.com/pulse/deploy-nextjs-app-cicd-github-actions-aws-ec2-instance-jeremy-qin-cdayc
- candidate, seems most streamlined: https://medium.com/@peterfaretra/deploy-a-next-js-app-to-aws-with-a-ci-cd-pipeline-using-github-actions-f3a121c69353 - next, pm2
- candidate: clean and simple, but no pm2? https://www.codegirl0101.dev/2024/04/deploy-nextjs-to-aws-ec2-with-github.html 
- also uses docker and mongoDB https://www.youtube.com/watch?v=sjTdluu1yDU - next.js, EC2, github Actions

Plan to use:
- https://dev.to/j3rry320/deploy-your-nextjs-app-like-a-pro-a-step-by-step-guide-using-nginx-pm2-certbot-and-git-on-your-linux-server-3286


2. Decide what to use as database. SQL versus other options available at AWS. May want to consider in-memory options (ElastiCache, MemoryDB) for faster performance.


