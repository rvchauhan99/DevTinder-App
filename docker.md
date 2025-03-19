✅ A Node.js application (already built).
✅ A GitHub repository (where your code is stored).
✅ An AWS account (with admin access).
✅ Docker installed on your local machine.
✅ AWS CLI installed and configured (aws configure).
✅ Terraform (optional, but recommended for automation).



aws ecr create-repository --repository-name my-node-app

aws ecr get-login-password | docker login --username AWS --password-stdin 727646484307.dkr.ecr.ap-south-1.amazonaws.com


docker tag my-node-app:latest 727646484307.dkr.ecr.ap-south-1.amazonaws.com/my-node-app:latest
docker push 727646484307.dkr.ecr.ap-south-1.amazonaws.com/my-node-app:latest