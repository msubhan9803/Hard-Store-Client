Customer:
# Project
ng build --configuration production
sudo rm dist.zip
sudo zip -r dist.zip dist/ 

# VM
cd /var/www/hardtaker/customer
sudo rm -r *

# Project
scp -r dist.zip root@159.223.37.76:/var/www/hardtaker/customer/ 

# VM
sudo unzip dist.zip 
# ===================
Admin:
# Project
ng build --configuration production --base-href /admin/
sudo rm dist.zip
sudo zip -r dist.zip dist/ 

# VM
cd /var/www/hardtaker/admin/
sudo rm -r *

# Project
scp -r dist.zip root@159.223.37.76:/var/www/hardtaker/admin/ 

# VM
sudo unzip dist.zip 
sudo mv dist/multikart-backend/* .

# ===================
sudo systemctl restart nginx